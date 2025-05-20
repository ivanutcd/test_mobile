using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.Utils;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VersionamientoFormulario
{
    public class VersionamientoFormularioCommandHandler : ICommandHandler<VersionamientoFormularioCommand>
    {
        public IWritableEventStoreRepository<FormularioRoot> WritableEventStore { get; }
        public IReadOnlyRepository<Projections.FormularioTable.Formulario> FormularioRepository { get; }
        public VersionamientoFormularioCommandHandler(
            IWritableEventStoreRepository<FormularioRoot> writableEventStore, IReadOnlyRepository<Projections.FormularioTable.Formulario> formularioRepository
        )
        {
            WritableEventStore = writableEventStore;
            FormularioRepository = formularioRepository;
        }
        public async Task Handle(VersionamientoFormularioCommand command)
        {
            var stringVersion = new StringVersion(FormularioRepository);
            var version = await stringVersion.Version(command.Id);
            SpecificationGeneric<Projections.FormularioTable.Formulario> spec = new();
            spec.Query.Where(x => x.Id == command.Id);
            Projections.FormularioTable.Formulario formularioBase = await FormularioRepository.FirstOrDefault(spec);
            var id = Guid.NewGuid();
            var model = new FormularioRoot(
                id,
                formularioBase.NombreTecnico,
                formularioBase.Descripcion,
                formularioBase.MovilidadAsociada,
                FormularioEstado.Borrador.Value,
                version,
                formularioBase.EstructuraFormulario,
                command.Id
            );

            await WritableEventStore.Create(model);
        }
    }
}
