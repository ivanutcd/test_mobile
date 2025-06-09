using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

public class ConsultarFormularioQueryRunner: IQueryRunner<ConsultarFormularioQuery, IPaginated<FormularioResponse>>
{
    public IReadOnlyRepository<Projections.FormularioTable.Formulario> Repository { get; }
    public IObjectMapper  Mapper { get; }

    public ConsultarFormularioQueryRunner(IReadOnlyRepository<Projections.FormularioTable.Formulario> repository, IObjectMapper mapper)
    {
        Repository = repository;
        Mapper = mapper;
    }

    public async Task<IPaginated<FormularioResponse>> Run(ConsultarFormularioQuery query)
    {
        var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
        spec.Query.Where(x => x.NombreTecnico.Contains(query.Request.NombreTecnico),
            !string.IsNullOrWhiteSpace(query.Request.NombreTecnico));
        spec.Query.Where(x => x.MovilidadAsociada.Contains(query.Request.MovilidadAsociada),
            !string.IsNullOrWhiteSpace(query.Request.MovilidadAsociada));
        spec.Query.Where(x => x.Estado == query.Request.Estado,
            !string.IsNullOrWhiteSpace(query.Request.Estado));
        spec.Query.Where(x => x.NombreTecnico.Contains(query.Request.GeneralSearch) ||
                              x.MovilidadAsociada.Contains(query.Request.GeneralSearch) ||
                              x.Estado.Contains(query.Request.GeneralSearch),
            !string.IsNullOrWhiteSpace(query.Request.GeneralSearch));
        spec.Query
            .OrderByDescending(x => x.UpdatedDate)
            .ThenByDescending(x => x.CreatedDate);


        IPaginated<Projections.FormularioTable.Formulario> paginatedFormulario = await Repository.Paginate(query.Request.Page, query.Request.PageSize, spec);
        return this.Mapper.Map<IPaginated<FormularioResponse>>(paginatedFormulario);
    }
}
