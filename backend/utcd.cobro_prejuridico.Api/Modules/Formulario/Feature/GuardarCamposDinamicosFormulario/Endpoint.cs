using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using Microsoft.AspNetCore.Mvc;
using Sprache;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.GuardarComposDinamicosFormulario
{
    public static class Endpoint
    {
        public static void GuardarComposDinamicosFormulario(this IEndpointRouteBuilder app)
        {
            app.MapPut(
                    "/GuardarComposDinamicosFormulario",
                    async (
                        IDispatcher dispatcher,
                        FormularioGuardarCamposDinamicoRequest input
                        
                    ) =>
                    {
                      
                        try
                        {
                            var command = new GuardarCamposDinamicosFormularioCommand(
                          input.Id,
                          input.EstructuraFormulario
                      );
                            Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                            );

                        return result.ToResponse(new EntityIdResponse(input.Id));
                        }
                        catch (Exception ex)
                        {
                            var es = ex.Message;
                            throw;
                        }
                      
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Guardar Campos Dinamico Formulario.")
                .WithDescription("Guardar Campos Dinamico.")
                .WithOpenApi();
        }
    }
}

