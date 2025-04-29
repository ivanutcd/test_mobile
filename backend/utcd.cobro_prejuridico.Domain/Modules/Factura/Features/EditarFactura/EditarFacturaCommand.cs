using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EditarFactura;

public record EditarFacturaCommand(Guid Id, string Numero,DateOnly FechaEmision, string EstadoId):ICommand
{

}
