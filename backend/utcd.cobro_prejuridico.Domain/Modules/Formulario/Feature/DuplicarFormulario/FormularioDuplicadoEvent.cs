

using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.DuplicarFormulario;

public class FormularioDuplicadoEvent : DomainEvent<Guid>
{
    public Guid AggregateId { get; }
    public string NombreTecnico { get; }
    public string Descripcion { get; }
    public string MovilidadAsociada { get; }
    public string Estado { get; }
    public string? EstructuraFormulario { get; }
    public DateTime? FechaDuplicado { get; }
    public bool? EsDuplicado { get; }

    public FormularioDuplicadoEvent(
        Guid aggregateId,
        string nombreTecnico,
        string descripcion,
        string movilidadAsociada,
        string estado,
        string? estructuraFormulario,
        DateTime? fechaDuplicado,
        bool? esDuplicado):base(aggregateId)
    {
        AggregateId = aggregateId;
        NombreTecnico = nombreTecnico;
        Descripcion = descripcion;
        MovilidadAsociada = movilidadAsociada;
        Estado = estado;
        EstructuraFormulario = estructuraFormulario;
        FechaDuplicado = fechaDuplicado;
        EsDuplicado = esDuplicado;
    }

}
