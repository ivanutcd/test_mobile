using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EliminarFactura;

public record EliminarFacturaCommand(Guid Id):ICommand;
