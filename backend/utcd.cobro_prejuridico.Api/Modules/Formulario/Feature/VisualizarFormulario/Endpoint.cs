using Enee.Core.CQRS.Query;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VisualizarFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.VisualizarFormulario;

public static class Endpoint
{
    public static void ConsultarFormularioId(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "/{id}",
                async ([FromRoute] Guid id, IQueryDispatcher dispatcher) =>
                {
                    Domain.Modules.Formulario.Projections.FormularioTable.Formulario? result =
                        await dispatcher.Execute(
                            new VisualizarFormularioQuery() { idFormulario = id }
                        );
                    return result;
                }
            )
            .Produces<FormularioIdResponse>()
            .WithSummary("Obtiene el detalle de un formulario")
            .WithDescription("Listar Agentes Recaudadores pagina.")
            .WithOpenApi();
    }
}
