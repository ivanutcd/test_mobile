using Enee.Core.CQRS.Query;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarCampoDinamicoFormulario.ConsultarCampoDinamicoFormularioPorId;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarCampoDinamicoFormulario
{
    public static class Endpoints
    {
    public static void ConsultarEstructuraFormularioId(this IEndpointRouteBuilder app)
    {
        app.MapPost(
                "/EstructuraFormulario",
                async (EstructuraFormularioIdRequest request, IQueryDispatcher dispatcher) =>
                {
                    var result = await dispatcher.Execute(
                        new ConsultarCampoDinamicoFormularioPorIdQuery() { Id = request.Id }
                    );
                    if (result != null)
                    {
                        return Results.Ok(
                            new EstructuraFormularioIdResponse
                            {
                                Objeto = result,
                                
                            }
                        );
                    }

                    return Results.NotFound();
                }
            )
            .Produces<object>()
            .WithSummary("Consultar  estructura formulario por id")
            .WithDescription("Consulta estructura formulario.")
            .WithOpenApi();
    }
}
}
