using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EditarFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarFactura;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;

public class FacturaProjector : TableProjector<Facturas>
{
    public FacturaProjector()
    {
        Create<FacturaCreada>((@event, tabla) =>
        {
            tabla.Id = @event.AggregateId;
            tabla.Numero = @event.Numero;
            tabla.FechaEmision = @event.FechaEmision;
            tabla.EstadoId = @event.EstadoId;
        });

        Project<FacturaEditada>((@event, tabla) =>
        {
            tabla.Numero = @event.Numero;
            tabla.FechaEmision = @event.FechaEmision;
            tabla.EstadoId = @event.EstadoId;
        });

        SoftDeleted<FacturaEliminada>();
    }
}

