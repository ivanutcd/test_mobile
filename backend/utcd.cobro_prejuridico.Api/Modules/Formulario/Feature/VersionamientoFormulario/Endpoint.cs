using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VersionamientoFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.VersionamientoFormulario
{
    public static class Endpoint
    {
        public static void VersionamientoFormularioRequest(this IEndpointRouteBuilder app)
        {
            app.MapPost(
                    "/versionamiento-formulario",
                    async (VersionamientoFormularioRequest input, IDispatcher dispatcher) =>
                    {
                        var command = new VersionamientoFormularioCommand(input.Id);

                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                        );
                        return result.ToResponse(new EntityIdResponse() { Id = input.Id });
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Versionamiento Formulario")
                .WithDescription("Versionamiento de formulario dinamico")
                .WithOpenApi();
        }
    }
}
