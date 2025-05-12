using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario
{
    public class PublicarFormularioCommandHandler : ICommandHandler<PublicarFormularioCommand>
    {
        private readonly IWritableEventStoreRepository<FormularioRoot> Store;

        public PublicarFormularioCommandHandler(IWritableEventStoreRepository<FormularioRoot> store)
        {
            Store = store;
        }

        public async Task Handle(PublicarFormularioCommand command)
        {
            FormularioRoot root = await Store.Find(command.Id);

            root.PublicarFormilarioEstado(Estados.Publicado);
            await Store.Update(root);
        }
    }
}
