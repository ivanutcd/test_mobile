using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro;

namespace utcd.cobro_prejuridico.Api.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public class CrearFormulariosRegistroRequest
    {
        public IEnumerable<DatosFormularioDto> DataFormularios { get; set; }
    }

}
