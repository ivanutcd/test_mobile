
using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.CrearAlmacen;

public record CrearAlmacenCommand(Guid Id, string NombreSucursal, string NombreAdministrador, string Telefono, string Direccion,string Fax, double? NumeroPedidos) : ICommand;
