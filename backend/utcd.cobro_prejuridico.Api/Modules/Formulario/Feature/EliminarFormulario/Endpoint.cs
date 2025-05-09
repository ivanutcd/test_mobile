using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using Enee.IoC.Architecture.Auth;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.EliminarFormulario
{
    public static class Endpoint
    {
        public static void EliminarFormulario(this IEndpointRouteBuilder app)
        {
            app.MapDelete(
                    "/{id}",
                    async ([FromRoute] Guid id, IDispatcher dispatcher) =>
                    {
                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(new EliminarFormularioCommand(id));
                        return result.ToResponse(new EntityIdResponse() { Id = id });
                    }
                )
                .Produces<EntityIdResponse>()
                .WithSummary("Eliminar Formulario")
                .WithDescription("Eliminación de formulario dinamico")
                //.Access(Permisos.ELIMINAR_FORMULARIO)
                .WithOpenApi();
        }
    }
}
