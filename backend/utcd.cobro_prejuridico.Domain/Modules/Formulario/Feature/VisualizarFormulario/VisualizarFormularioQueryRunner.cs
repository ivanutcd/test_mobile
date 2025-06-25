using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VisualizarFormulario;

public class VisualizarFormularioQueryRunner
    : IQueryRunner<VisualizarFormularioQuery, Projections.FormularioTable.Formulario>
{
    private readonly IReadOnlyRepository<Projections.FormularioTable.Formulario> _repository;

    public VisualizarFormularioQueryRunner(
        IReadOnlyRepository<Projections.FormularioTable.Formulario> repository
    )
    {
        _repository = repository;
    }

    public async Task<Projections.FormularioTable.Formulario> Run(VisualizarFormularioQuery query)
    {
        var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
        spec.Query.Where(x => x.Id == query.idFormulario);

        Task<Projections.FormularioTable.Formulario>? result = _repository.FirstOrDefault(spec);
        return result != null
            ? new Projections.FormularioTable.Formulario
            {
                Id = result.Result.Id,
                NombreTecnico = result.Result.NombreTecnico,
                Descripcion = result.Result.Descripcion,
                MovilidadAsociada = result.Result.MovilidadAsociada,
                Estado = result.Result.Estado,
                VersionFormulario = result.Result.VersionFormulario,
                EsEditable = result.Result.EsEditable,
            }
            : null;
    }
}
