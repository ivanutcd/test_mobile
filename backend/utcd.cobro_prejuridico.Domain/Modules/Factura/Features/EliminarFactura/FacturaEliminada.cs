using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarFactura;

public class FacturaEliminada:DomainEvent<Guid>
{
    public FacturaEliminada(Guid aggregateId) : base(aggregateId)
    {
    }
}
