using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;

public class ItemAgregado:DomainEvent<Guid>
{
    public ItemAgregado(Guid aggregateId,Guid itemId, string producto, int cantidad, decimal precio) : base(aggregateId)
    {
        ItemId = itemId;
        Producto = producto;
        Cantidad = cantidad;
        Precio = precio;
    }

    public string Producto { get; set; }
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }
    public Guid ItemId { get; set; }
}
