using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.EliminarAlmacen;

public class AlmacenEliminado:DomainEvent<Guid>
{
    public AlmacenEliminado(Guid aggregateId) : base(aggregateId)
    {
    }
}
