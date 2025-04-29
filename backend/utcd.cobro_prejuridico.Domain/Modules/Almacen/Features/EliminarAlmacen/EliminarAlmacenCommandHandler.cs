using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.EliminarAlmacen;

public class EliminarAlmacenCommandHandler:ICommandHandler<EliminarAlmacenCommand>
{
    public IWritableEventStoreRepository<Aggregates.Almacen> Repository { get; }

    public EliminarAlmacenCommandHandler(IWritableEventStoreRepository<Aggregates.Almacen> repository)
    {
        Repository = repository;
    }
    public async Task Handle(EliminarAlmacenCommand command)
    {
        Aggregates.Almacen? almacen = await Repository.Find(command.Id).ConfigureAwait(false);
        almacen.Eliminar();
        await Repository.Update(almacen).ConfigureAwait(false);
    }
}
