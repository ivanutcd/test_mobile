using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarItemFactura;

public class ItemFacturaEliminado:DomainEvent<Guid>
{
    
    public Guid ItemId { get; }


    public ItemFacturaEliminado(Guid aggregateId, Guid ItemId) : base(aggregateId)
    {
        this.ItemId = ItemId;
    }
    
}