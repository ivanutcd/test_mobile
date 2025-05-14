using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;

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

            root.PublicarFormilarioEstado(FormularioEstado.Publicado.Value);
            await Store.Update(root);
        }
    }
}
