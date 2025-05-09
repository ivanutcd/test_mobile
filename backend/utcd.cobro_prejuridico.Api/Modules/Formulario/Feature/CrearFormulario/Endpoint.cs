using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using Enee.IoC.Architecture.Auth;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.CrearFormulario
{
    public static class Endpoint
    {
        public static void CrearFormulario(this IEndpointRouteBuilder app)
        {
            app.MapPost(
                    "/",
                    async (FormularioRequest input, IDispatcher dispatcher) =>
                    {
                        var id = Guid.NewGuid();

                        var command = new CrearFormularioCommand(
                            id,
                            input.NombreTecnico,
                            input.Descripcion,
                            input.MovilidadAsociada,
                            input.Estado
                        );

                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                        );

                        return result.ToResponse(new EntityIdResponse(id));
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Crear Formulario.")
                .WithDescription("Creación de formulario dinamico.")
                //.Access(Permisos.CREAR_FORMULARIO)
                .WithOpenApi();
        }
    }
}
