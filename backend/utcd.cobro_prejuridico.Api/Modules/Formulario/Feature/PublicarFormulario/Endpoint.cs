using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using Enee.IoC.Architecture.Auth;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.EditarFormulario;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.PublicarFormulario
{
    public static class Endpoint
    {
        public static void PublicarFormulario(this IEndpointRouteBuilder app)
        {
            app.MapPut(
                    "/",
                    async (FormularioPublicarRequest input, IDispatcher dispatcher) =>
                    {
                        var command = new PublicarFormularioCommand(
                           input.Id
                        );

                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                        );
                        return result.ToResponse(new EntityIdResponse() { Id = input.Id });
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Publicar Formulario")
                .WithDescription("Publicación de formulario dinamico")
                //.Access(Permisos.PUBLICAR_FORMULARIO)
                .WithOpenApi();
        }
    }
}
