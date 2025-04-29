using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.CrearAlmacen;

public class AlmacenCreado:DomainEvent<Guid>
{
    public AlmacenCreado(Guid aggregateId, string nombreSucursal, string nombreAdministrador, string telefono, string direccion, string fax, double? numeroPedidos) : base(aggregateId)
    {
        NombreSucursal = nombreSucursal;
        NombreAdministrador = nombreAdministrador;
        Telefono = telefono;
        Direccion = direccion;
        Fax = fax;
        NumeroPedidos = numeroPedidos;
    }

    public string NombreSucursal { get; set; }
    public string NombreAdministrador { get; set; }
    public string Telefono { get; set; }
    public string Direccion { get; set; }
    public string Fax { get; set; }
    public double? NumeroPedidos { get; set; }
}
