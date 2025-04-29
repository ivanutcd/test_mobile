using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;

public class CrearFacturaCommandHandler(IWritableEventStoreRepository<Aggregates.Factura> facturas):ICommandHandler<CrearFacturaCommand>
{
    public async Task Handle(CrearFacturaCommand command)
    {
        var factura = new Aggregates.Factura(command.Id, command.Numero, command.FechaEmision, command.EstadoId);
        factura.AgregarItem(new DetalleFactura()
        {
            Id = Guid.NewGuid(),
            FacturaId = command.Id,
            Producto = "Producto 1",
            Cantidad = 1,
            Precio = 10,
        });
       await facturas.Create(factura);
    }
}
