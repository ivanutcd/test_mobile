using Enee.Core.CQRS.Query;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarCampoDinamicoFormulario;
using utcd.cobro_prejuridico.Domain.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularioRelacionados;

namespace utcd.cobro_prejuridico.Api.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario
{
    public static class Endpoint
    {
        public static void ConsultarAsignacionesDiariasPorUsuarioId(this IEndpointRouteBuilder app)
        {
            app.MapGet(
                    "/consultar-asignaciones-diarias",
                       async (
                        [AsParameters] ConsultarAsignacionesDiariasPorUsuarioRequest request,
                        IQueryDispatcher dispatcher
                       ) =>
                       {
                           List<AsignacionTrabajoResponse> result = await dispatcher.Execute(
                           new ConsultarAsignacionesDiariasPorUsuarioIdQuery()
                           {
                               IdUsuario = request.IdUsuario,
                               FechaAsignacion = request.FechaAsignacion
                           });
                           return result;
                       }

            )
            .Produces<IEnumerable<AsignacionTrabajoResponse>>()
            .WithSummary("Consultar asignaciones diarias")
            .WithDescription("Permite consultar las asignaciones de trabajo diarias del usuario móvil, filtradas por fecha de asignación e IdUsuario.")
            .WithOpenApi();
        }
    }
}
