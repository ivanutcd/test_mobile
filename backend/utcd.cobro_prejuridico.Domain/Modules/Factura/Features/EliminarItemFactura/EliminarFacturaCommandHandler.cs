using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarItemFactura;

public class EliminarFacturaCommandHandler(IWritableEventStoreRepository<Aggregates.Factura> facturas):ICommandHandler<EliminarItemFacturaCommand>
{
    public async Task Handle(EliminarItemFacturaCommand command)
    {
        Aggregates.Factura? factura = await facturas.Find(command.FacturaId);
        factura.EliminarItem(command.ItemId);
       await facturas.Update(factura);
    }
}
