using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.CrearAlmacen;
using utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.EliminarAlmacen;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Aggregates;

public class Almacen:AggregateRoot<Guid>
{
    public Almacen()
    {

    }
    public Almacen(Guid id, string nombreSucursal, string nombreAdministrador, string telefono, string direccion, string fax, double? numeroPedidos)
    {
        Apply(NewChange(new AlmacenCreado(id, nombreSucursal, nombreAdministrador, telefono, direccion, fax,
            numeroPedidos)));
    }


    public override Guid Id { get; set; }
    public string NombreSucursal { get; set; }
    public string NombreAdministrador { get; set; }
    public string Telefono { get; set; }
    public string Direccion { get; set; }
    public string Fax { get; set; }
    public double? NumeroPedidos { get; set; }

    public void Eliminar()
    {
        Apply(NewChange(new AlmacenEliminado(this.Id)));
    }

    private void Apply(AlmacenCreado @event)
    {
        this.Id = @event.AggregateId;
        this.NombreSucursal = @event.NombreSucursal;
        this.NombreAdministrador  = @event.NombreAdministrador ;
        this.Telefono  = @event.Telefono ;
        this.Direccion  = @event.Direccion;
        this.Fax  = @event.Fax ;
        this.NumeroPedidos  = @event.NumeroPedidos;
        Version++; // de validar en las pull request
    }

    private void Apply(AlmacenEliminado @event)
    {
        Version++;
    }

}
