using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using utcd.cobro_prejuridico.Api.Common;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.GuardarComposDinamicosFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.DuplicarFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.DuplicarFormulario;

public static class Endpoint
{
    public static void DuplicarFormulario(this IEndpointRouteBuilder app)
    {
        app.MapPost(
                "/DuplicarFormulario",
                async (
                    IDispatcher dispatcher,
                    FormularioDuplicarRequest input

                ) =>
                {
                    try
                    {
                        var command = new DuplicarFormularioCommand(
                            input.Id);
                        Either<OK, List<MessageValidation>> result = await dispatcher.Dispatch(
                            command
                        );
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        throw;
                    }
                }
            ).Produces<EntityIdResponse>()
            .WithSummary("Duplicar formulario.")
            .WithDescription("Guardar la copia de un formulario.")
            .WithOpenApi();
    }
}

