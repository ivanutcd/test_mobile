namespace utcd.cobro_prejuridico.Api.Modules.Almacen.Features.CrearAlmacen;

public class AlmacenRequest
{
    public  string NombreSucursal { get; set; }
    public   string NombreAdministrador { get; set; }
    public required string Telefono { get; set; }
    public required string Direccion { get; set; }
    public required string Fax { get; set; }
    public double? NumeroPedidos { get; set; }
}
