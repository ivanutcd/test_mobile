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
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;
using JasperFx.Core;
namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario
{
    public class ConsultarLogsFormularioQueryRunner:IQueryRunner<ConsultarLogsFormularioQuery, IPaginated<LogFormularioResponse>>
    {
        IReadOnlyDocumentRepository<EventLog> Repository { get; }
        public IReadOnlyRepository<Projections.FormularioTable.Formulario> FormulariosContext { get; }
        public IObjectMapper Mapper { get; }
        public ConsultarLogsFormularioQueryRunner(IReadOnlyDocumentRepository<EventLog> repository, IReadOnlyRepository<Projections.FormularioTable.Formulario> formulariosContext, IObjectMapper mapper)
        {
            Repository = repository;
            FormulariosContext = formulariosContext;
            Mapper = mapper;
        }
        public async Task<IPaginated<LogFormularioResponse>> Run(ConsultarLogsFormularioQuery query)
        {
            var logsSpec = new SpecificationGeneric<EventLog>();
            if (query.RelatedId != null)
            {
                var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
                IEnumerable<Projections.FormularioTable.Formulario> formulario = await FormulariosContext.List(spec);
                IList<Projections.FormularioTable.Formulario> formulariosRelacionadosOrdenados = ObtenerFormulariosRelacionados(formulario, query.RelatedId.Value).OrderByDescending(s => s.CreatedDate).ToList();
                var formularioId = formulariosRelacionadosOrdenados.Select(s => s.Id).ToList();
                logsSpec.Query.Where(x => formularioId.Contains( x.RelatedId));
            }

           
            logsSpec.Query.OrderByDescending(x => x.Created);
            logsSpec.Query.Where(x => x.LogType == query.LogType, !string.IsNullOrWhiteSpace(query.LogType));
            logsSpec.Query.Where(x => x.UserId == query.UserId, !string.IsNullOrWhiteSpace(query.UserId));
            logsSpec.Query.Where(x => x.Username == query.UserName, !string.IsNullOrWhiteSpace(query.UserName));
            logsSpec.Query.Where(x => x.UserFullName.Contains(query.UserFullName!), !string.IsNullOrWhiteSpace(query.UserFullName));
            logsSpec.Query.Where(x => x.EventType == query.EventType, !string.IsNullOrWhiteSpace(query.EventType));
            logsSpec.Query.Where(x => x.AggregateId == query.AggregateId, query.AggregateId.HasValue);
            logsSpec.Query.Where(x => x.AggregateType == query.AggregateType, !string.IsNullOrWhiteSpace(query.AggregateType));
            logsSpec.Query.Where(x => x.Created >= query.FromDate, query.FromDate.HasValue);

            IPaginated<EventLog> paginatedLogs = await Repository.Paginate(
                query.Page,
                query.PageSize,
                logsSpec);

            var relatedIds = paginatedLogs.Data.Select(x => x.RelatedId).Distinct().ToList();

            var formulariosSpec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
            formulariosSpec.Query.Where(x => relatedIds.Contains(x.Id));

            IEnumerable<Projections.FormularioTable.Formulario> formularios = await FormulariosContext.List(formulariosSpec);
            var formulariosById = formularios.ToDictionary(f => f.Id);

            var logsResponse = paginatedLogs.Data
                .Where(log => formulariosById.TryGetValue(log.RelatedId, out _))
                .Select(log =>
                {
                    Projections.FormularioTable.Formulario formulario = formulariosById[log.RelatedId];
                    return LogFormularioResponse.NewItem(
                        formulario.Id,
                        log.Description,
                        log.UserFullName,
                        formulario.Estado,
                        formulario.VersionFormulario,
                        log.Created
                    );
                })
                .ToList();

            return new Paginated<LogFormularioResponse>
            {
                Data = logsResponse,
                CurrentPage = query.Page ?? 1,
                PageSize = query.PageSize ?? 10,
                RowCount = paginatedLogs.RowCount,
                PageCount = (int)Math.Ceiling((double)paginatedLogs.RowCount / (query.PageSize ?? 10))
            };
        }

        private List<Projections.FormularioTable.Formulario> ObtenerFormulariosRelacionados(
          IEnumerable<Projections.FormularioTable.Formulario> todosLosFormularios,
          Guid id,
          HashSet<Guid> visitados = null)
        {
            visitados ??= new HashSet<Guid>();
            var resultado = new List<Projections.FormularioTable.Formulario>();

            if (visitados.Contains(id))
                return resultado;

            visitados.Add(id);

            Projections.FormularioTable.Formulario formularioActual = todosLosFormularios.FirstOrDefault(f => f.Id == id);
            if (formularioActual == null)
                return resultado;

            resultado.Add(formularioActual);
            if (formularioActual.FormularioBaseId.HasValue)
            {
                resultado.AddRange(ObtenerFormulariosRelacionados(
                    todosLosFormularios,
                    formularioActual.FormularioBaseId.Value,
                    visitados
                ));
            }

            var formulariosDerivados = todosLosFormularios
                .Where(f => f.FormularioBaseId == id)
                .ToList();

            foreach (Projections.FormularioTable.Formulario formularioDerivado in formulariosDerivados)
            {
                resultado.AddRange(ObtenerFormulariosRelacionados(
                    todosLosFormularios,
                    formularioDerivado.Id,
                    visitados
                ));
            }

            return resultado;
        }
    }
}
