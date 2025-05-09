using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public class CrearFormularioCommandHandler : ICommandHandler<CrearFormularioCommand>
    {
        public CrearFormularioCommandHandler(
            IWritableEventStoreRepository<FormularioRoot> writableEventStore
        )
        {
            WritableEventStore = writableEventStore;
        }

        public IWritableEventStoreRepository<FormularioRoot> WritableEventStore { get; }

        public async Task Handle(CrearFormularioCommand command)
        {
            var model = new FormularioRoot(
                command.Id,
                command.NombreTecnico,
                command.Descripcion,
                command.MovilidadAsociada,
                command.Estado
            );

            await WritableEventStore.Create(model);
        }
    }
}
