using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

public class ConsultarFormularioQueryRunner: IQueryRunner<ConsultarFormularioQuery, IPaginated<Projections.FormularioTable.Formulario>>
{
    public IReadOnlyRepository<Projections.FormularioTable.Formulario> Repository { get; }

    public ConsultarFormularioQueryRunner(IReadOnlyRepository<Projections.FormularioTable.Formulario> repository)
    {
        Repository = repository;
    }

    public async Task<IPaginated<Projections.FormularioTable.Formulario>> Run(ConsultarFormularioQuery query)
    {
        var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
        spec.Query.Where(x => x.NombreTecnico.Contains(query.Filters.NombreTecnico),
            !string.IsNullOrWhiteSpace(query.Filters.NombreTecnico));
        spec.Query.Where(x => x.MovilidadAsociada.Contains(query.Filters.MovilidadAsociada),
            !string.IsNullOrWhiteSpace(query.Filters.MovilidadAsociada));
        spec.Query.Where(x => x.Estado == query.Filters.Estado,
            !string.IsNullOrWhiteSpace(query.Filters.Estado));
        spec.Query.OrderBy(x => x.CreatedDate);
        IPaginated<Projections.FormularioTable.Formulario> paginated = await Repository.Paginate(query.Filters.Page, query.Filters.PageSize, spec);
        return paginated;
    }
}
