using utcd.cobro_prejuridico.Api.Modules.Factura.Features.CrearFacturas;
using utcd.cobro_prejuridico.Api.Utilities.Response;
using Enee.Core.Common.Util;
using Enee.Core.CQRS.Command;
using Enee.Core.CQRS.Validation;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarItemFactura;
using Microsoft.AspNetCore.Mvc;

namespace utcd.cobro_prejuridico.Api.Modules.Factura.Features.EliminarItemFactura;

public static class Endpoint
{


    public static void EliminarItemFactura(this IEndpointRouteBuilder app)
    {

        app.MapDelete("/{id}/eliminarItem/{itemId}", async ([FromRoute]Guid id, [FromRoute]Guid itemId,IDispatcher dispatcher) =>
            {


                Either<OK, List<MessageValidation>>? result =await dispatcher.Dispatch(new EliminarItemFacturaCommand(id, itemId));


                return result.ToResponse(new FacturaResponse() { Id = id });
            })
            .Produces<FacturaResponse>()
            .WithSummary( "Eliminar item de factura")
            .WithDescription("Permite eliminar item de factura")

            .WithOpenApi();
        // .Access();
    }


}
