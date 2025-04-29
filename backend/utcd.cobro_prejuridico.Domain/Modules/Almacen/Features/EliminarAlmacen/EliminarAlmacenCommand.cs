using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.EliminarAlmacen;

public record EliminarAlmacenCommand(Guid Id) : ICommand;
