using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Enee.Core.Infraestructure.TrackingEvent.GetEventLog;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarLogFormulario
{
    public static class Endpoints
    {

        public static RouteHandlerBuilder ConsultarLogFormularios(this IEndpointRouteBuilder app)
        {
            return app.MapGet("logs", async ([AsParameters] ConsultarLogsFormularioQuery query, IQueryDispatcher dispatcher) =>
            {

                IPaginated<EventLog> result = await dispatcher.Execute(query);
                return result;

            })
            .Produces<IPaginated<Enee.Core.CQRS.Query.EventLog>>();
        }


    }
}
