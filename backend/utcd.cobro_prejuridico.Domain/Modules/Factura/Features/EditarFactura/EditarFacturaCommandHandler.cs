using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.EditarFactura;

public class EditarFacturaCommandHandler(IWritableEventStoreRepository<Factura.Aggregates.Factura> repository):ICommandHandler<EditarFacturaCommand>
{

    public async Task Handle(EditarFacturaCommand command)
    {
        Factura.Aggregates.Factura? factura=await repository.Find(command.Id);
        factura.Editar(command.Numero, command.FechaEmision, command.EstadoId);
        await repository.Update(factura);
    }
}
