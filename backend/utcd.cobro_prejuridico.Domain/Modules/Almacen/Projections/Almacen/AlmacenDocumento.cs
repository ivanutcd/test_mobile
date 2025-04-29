using Enee.Core.CQRS.Query;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Projections.Almacen;

[DocumentName("almacen_documento")]
public class AlmacenDocumento : Document<Guid>
{

    public string NombreSucursal { get; set; }
    public string NombreAdministrador { get; set; }
    public string Telefono { get; set; }
    public string Direccion { get; set; }
    public string Fax { get; set; }
    public string Otro { get; set; }
    public double? NumeroPedidos { get; set; }
}
