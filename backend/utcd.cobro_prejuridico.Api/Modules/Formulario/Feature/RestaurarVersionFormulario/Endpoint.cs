using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.RestaurarVersionFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.RestaurarVersionFormulario
{
    public static class Endpoint
    {
        public static void RestaurarFormulario(this IEndpointRouteBuilder app)
        {
            app.MapPost(
                    "/restaurar-version-formulario",
                    async (RestaurarVersionFormularioRequest input, IDispatcher dispatcher) =>
                    {
                        var command = new RestaurarVersionFormularioCommand(input.Id);

                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                        );
                        return result.ToResponse(new EntityIdResponse() { Id = input.Id });
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Restaura version obsoleto de formulario por id")
                .WithDescription("Restaura version formulario")
                .WithOpenApi();
        }
    }
}
