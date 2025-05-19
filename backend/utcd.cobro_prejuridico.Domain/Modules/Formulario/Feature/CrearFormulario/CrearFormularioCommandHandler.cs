using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public class CrearFormularioCommandHandler : ICommandHandler<CrearFormularioCommand>
    {
        public CrearFormularioCommandHandler(
            IWritableEventStoreRepository<FormularioRoot> writableEventStore,
            IObjectMapper mapper
        )
        {
            WritableEventStore = writableEventStore;
            Mapper = mapper;
        }

        public IWritableEventStoreRepository<FormularioRoot> WritableEventStore { get; }
        public IObjectMapper Mapper { get; }

        public async Task Handle(CrearFormularioCommand command)
        {
            //FormularioRoot? model = Mapper.Map<FormularioRoot>(command);
            var model = new FormularioRoot(
                command.Id,
                command.NombreTecnico,
                command.Descripcion,
                command.MovilidadAsociada,
                command.Estado,
                null,
                null,
                null
            );
            await WritableEventStore.Create(model);
        }
    }
}
