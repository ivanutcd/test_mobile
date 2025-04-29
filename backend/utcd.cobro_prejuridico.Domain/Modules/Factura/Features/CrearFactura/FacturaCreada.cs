using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;

public class FacturaCreada:DomainEvent<Guid>
{
    public string Numero { get; }
    public DateOnly FechaEmision { get; }
    public string EstadoId { get; set; }

    public FacturaCreada(Guid aggregateId, string numero, DateOnly fechaEmision, string estadoId) : base(aggregateId)
    {
        Numero = numero;
        FechaEmision = fechaEmision;
        EstadoId = estadoId;
    }

}
