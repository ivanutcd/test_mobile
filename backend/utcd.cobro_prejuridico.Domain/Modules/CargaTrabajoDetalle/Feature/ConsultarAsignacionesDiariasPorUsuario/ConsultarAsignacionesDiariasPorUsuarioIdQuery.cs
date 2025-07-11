using Enee.Core.CQRS.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario;

public class ConsultarAsignacionesDiariasPorUsuarioIdQuery : IQuery<List<AsignacionTrabajoResponse>>
{
    public string Description { get; } = "Consultar Query";
    public string IdUsuario { get; set; }
    public DateTime FechaAsignacion { get; set; }
}
