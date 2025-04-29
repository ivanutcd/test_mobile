using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarItemFactura;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;

public class Factura02Projector : TableProjector<DetalleFactura>
{
    public Factura02Projector()
    {
        Create<ItemAgregado>((@event, tabla) =>
            {
                tabla.Id = @event.ItemId;
                tabla.FacturaId = @event.AggregateId;
                tabla.Producto = @event.Producto;
                tabla.Cantidad = @event.Cantidad;
                tabla.Precio = @event.Precio;
            })
            .SetPrimaryKey(x=>x.ItemId);

        Deleted<ItemFacturaEliminado>().SetPrimaryKey(x=>x.ItemId);
    }
}
