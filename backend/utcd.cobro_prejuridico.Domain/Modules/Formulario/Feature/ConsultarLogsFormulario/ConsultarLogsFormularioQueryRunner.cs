using Enee.Core.CQRS.Query;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Common;
using Ardalis.Specification;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using Marten.Events;
using Marten.Linq.CreatedAt;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario;
using Marten;
namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario
{
    public class ConsultarLogsFormularioQueryRunner(IReadOnlyDocumentRepository<EventLog> repository) :
        IQueryRunner<ConsultarLogsFormularioQuery, IPaginated<EventLog>>
    {

        public async Task<IPaginated<EventLog>> Run(ConsultarLogsFormularioQuery query)
        {
            var spec = new SpecificationGeneric<EventLog>();
            spec.Query.OrderByDescending(x => x.Created);



            return await repository.Paginate(
                query.Page,
                query.PageSize,
                spec);
        }
    }

}
