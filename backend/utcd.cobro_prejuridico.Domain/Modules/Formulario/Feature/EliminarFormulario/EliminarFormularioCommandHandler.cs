using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario
{
    public class EliminarFormularioCommandHandler : ICommandHandler<EliminarFormularioCommand>
    {
        private readonly IWritableEventStoreRepository<FormularioRoot> Store;

        public EliminarFormularioCommandHandler(IWritableEventStoreRepository<FormularioRoot> store)
        {
            Store = store;
        }

        public async Task Handle(EliminarFormularioCommand command)
        {
            FormularioRoot root = await Store.Find(command.Id);

            root.Eliminar();
            await Store.Update(root);
        }
    }
}
