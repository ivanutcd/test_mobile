using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;
using MiFormulario = utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable.Formulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarFormulario;

public static class Endpoint
{
    public static void ConsultarFormulario(this IEndpointRouteBuilder app)
    {
        app.MapGet("/", async (IQueryDispatcher dispatcher, [AsParameters] FormularioFilters filters) =>
            {
                IPaginated<MiFormulario>? result =
                    await dispatcher.Execute(new ConsultarFormularioQuery(filters));
                return result;
            })
            .Produces<IPaginated<MiFormulario>>()
            .WithSummary("Listado formulario")
            .WithDescription("Permite listar formularios")
            .WithOpenApi();
        // .Access();
    }

}
