using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using Enee.IoC.Architecture.Auth;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.EditarFormulario
{
    public static class Endpoint
    {
        public static void EditarFormulario(this IEndpointRouteBuilder app)
        {
            app.MapPut(
                    "/{id}",
                    async (
                        FormularioEditarRequest input,
                        [FromRoute] Guid id,
                        IDispatcher dispatcher
                    ) =>
                    {
                        var command = new EditarFormularioCommand(
                            id,
                            input.NombreTecnico,
                            input.Descripcion,
                            input.MovilidadAsociada,
                            input.Estado,
                            false
                        );

                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                        );

                        return result.ToResponse(new EntityIdResponse(id));
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Editar Formulario.")
                .WithDescription("Edición de formulario dinamico.")
                //.Access(Permisos.EDITAR_FORMULARIO)
                .WithOpenApi();
        }
    }
}
