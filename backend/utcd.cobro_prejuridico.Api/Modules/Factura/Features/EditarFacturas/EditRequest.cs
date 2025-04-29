namespace utcd.cobro_prejuridico.Api.Modules.Factura.Features.EditarFacturas;

public class EditRequest
{
    public string Numero { get; set; }
    public DateOnly FechaEmision { get; set; }
    public string EstadoId { get; set; }
}
