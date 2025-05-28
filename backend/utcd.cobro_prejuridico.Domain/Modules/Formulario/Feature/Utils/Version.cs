using Ardalis.Specification;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;


namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.Utils
{
    public class StringVersion
    {
        public IReadOnlyRepository<Projections.FormularioTable.Formulario> FormularioRepository { get; }
        public StringVersion(IReadOnlyRepository<Projections.FormularioTable.Formulario> formularioRepository)
        {
            FormularioRepository = formularioRepository;
        }
        public  async Task<string> Version(Guid value)
        {
            SpecificationGeneric<Projections.FormularioTable.Formulario>? formulario = new();
            formulario.Query.Where(x => x.Id == value);
            Projections.FormularioTable.Formulario? estructuraFormulario = await FormularioRepository.FirstOrDefault(formulario);
            var  version = new VersionSemanticaVm();
            if (estructuraFormulario == null)
            {
                version = new VersionSemanticaVm { Major = 1, Minor = 0, Patch = 0 };
            }
            else {
                if (!string.IsNullOrWhiteSpace(estructuraFormulario.VersionFormulario))
                {
                    void RecorrerHaciaUltimaVersion(Guid id)
                    {
                        Projections.FormularioTable.Formulario obtenerUltimoFormulario = FormularioRepository.AsQueryable().FirstOrDefault(x => x.FormularioBaseId == id);
                        if (obtenerUltimoFormulario == null)
                        {
                            return;
                        }
                        estructuraFormulario = obtenerUltimoFormulario;
                        RecorrerHaciaUltimaVersion(obtenerUltimoFormulario.Id);
                    }

                    RecorrerHaciaUltimaVersion(estructuraFormulario.Id);

                    version = Parse(estructuraFormulario.VersionFormulario);

                }
                else
                {
                    version = new VersionSemanticaVm { Major = 1, Minor = 0, Patch = 1 };
                }
                
            }

            

            return version.ToString();
        }
        public static VersionSemanticaVm Parse(string versionStr)
        {
            var parts = versionStr.Split('.');
            if (parts.Length != 3)
                throw new FormatException("La versión no tiene el formato esperado MAJOR.MINOR.PATCH");
           
            return new VersionSemanticaVm
            {
                Major = int.Parse(parts[0]),
                Minor = int.Parse(parts[1]),
                Patch = int.Parse(parts[2])+1
            };
        }
        public class VersionSemanticaVm
        {
            public int Major { get; set; }
            public int Minor { get; set; }
            public int Patch { get; set; }
            public override string ToString() => $"{Major}.{Minor}.{Patch}";
        }
    }

}
