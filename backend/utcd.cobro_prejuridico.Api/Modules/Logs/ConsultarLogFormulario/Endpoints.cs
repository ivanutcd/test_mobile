using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Logs.ConsultarLogFormulario
{
    public static class Endpoints
    {

        public static RouteHandlerBuilder ConsultarLogFormularios(this IEndpointRouteBuilder app)
        {
            return app.MapGet("logs", async ([AsParameters] ConsultarLogsFormularioQuery query, IQueryDispatcher dispatcher) =>
            {

                IPaginated<LogFormularioResponse> result = await dispatcher.Execute(query);
                return result;

            })
            .Produces<IPaginated<LogFormularioResponse>>();
        }


    }
}
