using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using Marten.Exceptions;
using Microsoft.Extensions.Logging;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos
{
    public class GuardarCamposDinamicosFormularioCommandHandler : ICommandHandler<GuardarCamposDinamicosFormularioCommand>
    {
        private readonly IWritableEventStoreRepository<FormularioRoot> Store;

        public GuardarCamposDinamicosFormularioCommandHandler(IWritableEventStoreRepository<FormularioRoot> store)
        {
            Store = store;
        }

        public async Task Handle(GuardarCamposDinamicosFormularioCommand command)
        {
            FormularioRoot root = await Store.Find(command.Id);

            root.GuardarEstructuraFormulario(command.EstructuraFormulario);
            try
            {
                await Store.Update(root);
            }
            catch (MartenCommandException ex)
            {
                // Extraer y registrar error raíz
                var inner = ex.InnerException?.Message ?? ex.Message; 
                throw;
            }

        }
    }
}
