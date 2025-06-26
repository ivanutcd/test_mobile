using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.Utils;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public class CrearFormularioCommandHandler : ICommandHandler<CrearFormularioCommand>
    {
        public CrearFormularioCommandHandler(
            IWritableEventStoreRepository<FormularioRoot> writableEventStore,
            IObjectMapper mapper, IReadOnlyRepository<Projections.FormularioTable.Formulario> formularioRepository
        )
        {
            WritableEventStore = writableEventStore;
            FormularioRepository = formularioRepository;
            Mapper = mapper;
        }

        public IWritableEventStoreRepository<FormularioRoot> WritableEventStore { get; }
        public IReadOnlyRepository<Projections.FormularioTable.Formulario> FormularioRepository { get; }
        public IObjectMapper Mapper { get; }

        public async Task Handle(CrearFormularioCommand command)
        {
            var stringVersion = new StringVersion(FormularioRepository);
            var version = await stringVersion.Version(command.Id);
            //FormularioRoot? model = Mapper.Map<FormularioRoot>(command);
            var model = new FormularioRoot(
                command.Id,
                command.NombreTecnico,
                command.Descripcion,
                command.MovilidadAsociada,
                command.Estado,
                version,
                null,
                null,
                null
        );

        await WritableEventStore.Create(model);
        }
    }
}
