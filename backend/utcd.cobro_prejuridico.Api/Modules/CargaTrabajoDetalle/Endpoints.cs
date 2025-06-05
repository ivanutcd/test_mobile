using Carter;
using utcd.cobro_prejuridico.Api.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario;

namespace utcd.cobro_prejuridico.Api.Modules.CargaTrabajoDetalle
{
    public class Endpoints : CarterModule
    {
        public Endpoints()
            : base("/api/v1/carga-trabajo-detalle")
        {
            this.WithTags("Carga Trabajo Detalle");
        }

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.ConsultarAsignacionesDiariasPorUsuarioId();

        }
    }
}
