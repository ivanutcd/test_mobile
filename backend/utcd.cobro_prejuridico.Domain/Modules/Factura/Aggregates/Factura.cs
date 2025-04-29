using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EditarFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarItemFactura;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Aggregates;

public class Factura : AggregateRoot<Guid>
{
    public Factura()
    {

    }

    public Factura(Guid id, string numero, DateOnly fechaEmision, string estadoId)
    {
        Apply(NewChange(new FacturaCreada(id, numero, fechaEmision, estadoId)));
    }

    public override Guid Id { get; set; }
    public string Numero { get; set; }
    public DateOnly FechaEmision { get; set; }
    public string EstadoId { get; set; }

    public List<DetalleFactura> Detalles { get; set; } = new();


    public void AgregarItem(DetalleFactura detalle)
    {
        Apply(NewChange(new ItemAgregado(Id, detalle.Id, detalle.Producto, detalle.Cantidad, detalle.Precio)));
    }

    public void Editar(string numero, DateOnly fechaEmision, string estadoId)
    {

        Apply(NewChange(new FacturaEditada(Id, numero, fechaEmision, estadoId)));
    }

    public void Eliminar()
    {
        Apply(NewChange(new FacturaEliminada(Id)));
    }


    public void EliminarItem(Guid commandId)
    {
        Apply(NewChange(new ItemFacturaEliminado(Id, commandId)));
    }


    private void Apply(FacturaCreada @event)
    {
        Id = @event.AggregateId;
        Numero = @event.Numero;
        FechaEmision = @event.FechaEmision;
        EstadoId = @event.EstadoId;
        Version++;
    }

    private void Apply(FacturaEditada @event)
    {
        Numero = @event.Numero;
        FechaEmision = @event.FechaEmision;
        EstadoId = @event.EstadoId;
        Version++;
    }

    private void Apply(FacturaEliminada @event)
    {
        Version++;
    }



    private void Apply(ItemAgregado @event)
    {
        Detalles.Add(new DetalleFactura()
        {
            Id = @event.ItemId,
            FacturaId = Id,
            Producto = @event.Producto,
            Cantidad = @event.Cantidad,
            Precio = @event.Precio,
        });
        Version++;
    }

    private void Apply(ItemFacturaEliminado newChange)
    {
        Detalles.RemoveAll(x => x.Id == newChange.ItemId);
        Version++;
    }

}
