using System.Buffers.Text;
using Ardalis.Specification;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using JasperFx.Core;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario
{
    public class PublicarFormularioCommandHandler : ICommandHandler<PublicarFormularioCommand>
    {
        private readonly IWritableEventStoreRepository<FormularioRoot> Store;
        public IReadOnlyRepository<Projections.FormularioTable.Formulario> Repository { get; }

        public PublicarFormularioCommandHandler(
            IWritableEventStoreRepository<FormularioRoot> store,
            IReadOnlyRepository<Projections.FormularioTable.Formulario> repositor
        )
        {
            Store = store;
            Repository = repositor;
        }

        public async Task Handle(PublicarFormularioCommand command)
        {
            FormularioRoot root = await Store.Find(command.Id);
            var cadenaFormularios = new List<Projections.FormularioTable.Formulario>();

            var actualSpec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
            actualSpec.Query.Where(x => x.Id == command.Id);
            Projections.FormularioTable.Formulario formularioActual =
                await Repository.FirstOrDefault(actualSpec);
            if (formularioActual == null)
                return;

            cadenaFormularios.Add(formularioActual);

            Projections.FormularioTable.Formulario formularioIterador = formularioActual;
            while (formularioIterador.FormularioBaseId.HasValue)
            {
                var baseSpec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
                baseSpec.Query.Where(x => x.Id == formularioIterador.FormularioBaseId.Value);
                Projections.FormularioTable.Formulario baseForm = await Repository.FirstOrDefault(
                    baseSpec
                );
                if (baseForm == null)
                    break;

                if (!cadenaFormularios.Any(f => f.Id == baseForm.Id))
                    cadenaFormularios.Add(baseForm);

                formularioIterador = baseForm;
            }
            async Task RecorrerDescendientes(Guid parentId)
            {
                var hijosSpec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
                hijosSpec.Query.Where(x => x.FormularioBaseId == parentId);
                IEnumerable<Projections.FormularioTable.Formulario> formulariosHijos =
                    await Repository.List(hijosSpec);

                foreach (Projections.FormularioTable.Formulario item in formulariosHijos)
                {
                    if (!cadenaFormularios.Any(f => f.Id == item.Id))
                    {
                        cadenaFormularios.Add(item);
                        await RecorrerDescendientes(item.Id);
                    }
                }
            }

            Guid ancestroId = formularioIterador.Id;
            await RecorrerDescendientes(ancestroId);

            var publicados = cadenaFormularios
                .Where(f => f.Estado == FormularioEstado.Publicado.Value && f.Id != command.Id)
                .ToList();

            foreach (Projections.FormularioTable.Formulario publicado in publicados)
            {
                FormularioRoot rootPublicado = await Store.Find(publicado.Id);
                rootPublicado.ObsoletoFormilarioEstado(FormularioEstado.Obsoleto.Value);
                await Store.Update(rootPublicado);
            }

            root.PublicarFormilarioEstado(FormularioEstado.Publicado.Value);
            await Store.Update(root);
        }
    }
}
