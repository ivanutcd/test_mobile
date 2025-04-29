using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.CrearAlmacen;

public class CrearAlmacenCommandHandler:ICommandHandler<CrearAlmacenCommand>
{
    public IWritableEventStoreRepository<Aggregates.Almacen> Repository { get; }

    public CrearAlmacenCommandHandler(IWritableEventStoreRepository<Aggregates.Almacen> repository)
    {
        Repository = repository;
    }

    public async Task Handle(CrearAlmacenCommand command)
    {

        var entity = new Aggregates.Almacen(command.Id, command.NombreSucursal, command.NombreAdministrador, command.Telefono,
            command.Direccion, command.Fax, command.NumeroPedidos);
        await Repository.Create(entity);
    }
}
