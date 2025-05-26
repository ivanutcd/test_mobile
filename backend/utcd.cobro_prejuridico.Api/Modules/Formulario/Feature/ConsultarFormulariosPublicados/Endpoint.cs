using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormulariosPublicados;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarFormulariosPublicados;

public static class Endpoint
{
    public static void ConsultarFormulariosPublicados(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "/publicados",
                async (IQueryDispatcher dispatcher, [AsParameters] FormulariosPublicadosRequest request) =>
                {
                    IPaginated<FormulariosPublicadosResponse>? result = await dispatcher.Execute(
                        new ConsultarFormulariosPublicadosQuery(request)
                    );
                    return result;
                }
            )
            .Produces<IPaginated<FormulariosPublicadosResponse>>()
            .WithSummary("Listado formularios publicados")
            .WithDescription("Permite listar formularios publicados")
            .WithOpenApi();
        // .Access();
    }
}
