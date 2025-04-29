namespace utcd.cobro_prejuridico.Api.Modules.Factura.Common;

public class FacturaRequest
{
    public string Numero { get; set; }
    public DateOnly FechaEmision { get; set; }
    public string EstadoId { get; set; }
}
