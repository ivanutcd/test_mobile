using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ardalis.Specification;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario
{
    public class EditarFormularioCommandHandler : ICommandHandler<EditarFormularioCommand>
    {
        private IWritableEventStoreRepository<FormularioRoot> Store { get; }

        public EditarFormularioCommandHandler(IWritableEventStoreRepository<FormularioRoot> store)
        {
            Store = store;
        }

        public async Task Handle(EditarFormularioCommand command)
        {
            FormularioRoot root = await Store.Find(command.Id);
            root.Editar(
                command.NombreTecnico,
                command.Descripcion,
                command.MovilidadAsociada,
                command.Estado,
                false
            );
            await Store.Update(root);
        }
    }
}
