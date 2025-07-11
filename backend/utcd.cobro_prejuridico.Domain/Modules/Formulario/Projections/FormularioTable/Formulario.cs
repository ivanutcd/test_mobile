using Enee.Core.Common;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;

public class Formulario : EntityAuditable<Guid>, IEntity<Guid>
{
    public string NombreTecnico { get; set; }
    public string Descripcion { get; set; }
    public string MovilidadAsociada { get; set; }
    public string Estado { get; set; }
    public string VersionFormulario { get; set; }
    public string? EstructuraFormulario { get; set; }
    public string? IdUsuario { get; set; }
    public bool? EsEditable { get; set; }

    #region Fereign key
    public Guid? FormularioBaseId { get; set; }
    public Formulario? FormularioBase { get; set; }
    #endregion
}
