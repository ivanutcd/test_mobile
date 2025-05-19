using Enee.Core.Common;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;

public class Formulario : EntityAuditable<Guid>, IEntity<Guid>
{
    public Guid Id { get; set; }
    public string NombreTecnico { get; set; }
    public string Descripcion { get; set; }
    public string MovilidadAsociada { get; set; }
    public string Estado { get; set; }
    public string VersionFormulario { get; set; }
   public string? EstructuraFormulario { get; set; }
   public DateTime? FechaDuplicado { get; set; }
   public bool? EsDuplicado { get; set; }
}

