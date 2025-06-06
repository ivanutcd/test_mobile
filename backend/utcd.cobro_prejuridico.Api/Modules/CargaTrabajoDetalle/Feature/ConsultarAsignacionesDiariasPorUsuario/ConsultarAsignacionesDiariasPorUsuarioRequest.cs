namespace utcd.cobro_prejuridico.Api.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario
{
    public class ConsultarAsignacionesDiariasPorUsuarioRequest
    {
        public Guid IdUsuario { get; set; }
        public DateTime FechaAsignacion { get; set; }
    }
}
