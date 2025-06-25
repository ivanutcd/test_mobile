using Ardalis.Specification;
using Enee.Core.CQRS.Command;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.DuplicarFormulario;

public class DuplicarFormularioCommandHandler : ICommandHandler<DuplicarFormularioCommand>
{
    private readonly IReadOnlyRepository<Projections.FormularioTable.Formulario> _repository;
    public DuplicarFormularioCommandHandler(
        IWritableEventStoreRepository<FormularioRoot> writableEventStore,
        IObjectMapper mapper,
        IReadOnlyRepository<Projections.FormularioTable.Formulario> repository

    )
    {
        WritableEventStore = writableEventStore;
        Mapper = mapper;
        _repository = repository;
    }

    public IWritableEventStoreRepository<FormularioRoot> WritableEventStore { get; }
    public IObjectMapper Mapper { get; }

    public async Task Handle(DuplicarFormularioCommand command)
    {
        var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
        spec.Query.Where(x => x.Id == command.Id);
        const string versionDefault = "1.0.0";
        Projections.FormularioTable.Formulario result = await _repository.FirstOrDefault(spec);
        const string texto = "copia_de_";
        var nuevoId = Guid.NewGuid();
        var nuevoFormulario = new FormularioRoot(
            nuevoId,
            texto + result.NombreTecnico,
            result.Descripcion,
            result.MovilidadAsociada,
            FormularioEstado.Borrador.Value,
            versionDefault,
            result.EstructuraFormulario,
            command.Id,
            true
        );
        await WritableEventStore.Create(nuevoFormulario);
    }
}

