using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarFormulario;

public static class Endpoint
{
    public static void ConsultarFormulario(this IEndpointRouteBuilder app)
    {
        app.MapGet("/", async (IQueryDispatcher dispatcher, [AsParameters] FormularioRequest filters) =>
            {
                IPaginated<FormularioResponse>? result =
                    await dispatcher.Execute(new ConsultarFormularioQuery(filters));
                return result;
            })
            .Produces<IPaginated<FormularioResponse>>()
            .WithSummary("Listado formulario")
            .WithDescription("Permite listar formularios")
            .WithOpenApi();
        // .Access();
    }

}
