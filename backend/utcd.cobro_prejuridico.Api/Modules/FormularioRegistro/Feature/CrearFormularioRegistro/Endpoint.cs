using Enee.Core.CQRS.Command;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro;

namespace utcd.cobro_prejuridico.Api.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public static class Endpoint
    {
        public static void CrearFormulariosRegistro(this IEndpointRouteBuilder app)
        {
            app.MapPost(
            "/crear-datos",
            async (
                IDispatcher dispatcher,
                [FromServices] CrearFormularioRegistroCommadHandler handler,
                [FromBody] CrearFormulariosRegistroRequest input
            ) =>
            {
                try
                {
                    var datosFormularioList = input.DataFormularios.Select(f => new DatosFormularioDto
                    {
                        ClientFormId = f.ClientFormId,
                        FormId = f.FormId,
                        VersionFormulario = f.VersionFormulario,
                        IdUsuario = f.IdUsuario,
                        FechaInicio = f.FechaInicio,
                        Datos = f.Datos
                    }).ToList();

                    var command = new CrearFormularioRegistroCommad(datosFormularioList);

                    List<FormularioRegistroResponse> result = await handler.Handle(command);

                    return Results.Ok(result);
                }
                catch (Exception ex)
                {
                    return Results.Problem(ex.Message);
                }
            }
        )
        .Produces<List<FormularioRegistroResponse>>()
        .WithSummary("Crear los datos de un formulario desde la app móvil")
        .WithDescription("Permite recibir y guardar los datos de formularios enviados desde un cliente móvil, incluso si están en proceso.")
        .WithOpenApi();
        }
    }
}
