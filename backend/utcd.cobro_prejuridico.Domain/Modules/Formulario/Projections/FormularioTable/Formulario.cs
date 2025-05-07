using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;

public class Formulario: EntityAuditable<Guid>
{
    public string NombreTecnico { get; set; }
    public string Descripcion { get; set; }
    public string MovilidadAsociada { get; set; }
    public string Estado { get; set; }
    public string VersionFormulario { get; set; }
}
