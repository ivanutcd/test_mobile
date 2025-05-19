using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public class FormularioCreadoEvent : DomainEvent<Guid>
    {
        public FormularioCreadoEvent(
            Guid aggregateId,
            string nombreTecnico,
            string descripcion,
            string movilidadAsociada,
            string estado,
            DateTime? fechaDuplicado,
            bool? esDuplicado,
            string? estructuraFormulario
        )
            : base(aggregateId)
        {
            NombreTecnico = nombreTecnico;
            Descripcion = descripcion;
            MovilidadAsociada = movilidadAsociada;
            Estado = estado;
            FechaDuplicado = fechaDuplicado;
            EsDuplicado = esDuplicado;
            EstructuraFormulario = estructuraFormulario;
        }

        public string NombreTecnico { get; }
        public string Descripcion { get; }
        public string MovilidadAsociada { get; }
        public string Estado { get; }
        public string? EstructuraFormulario { get; }
        public DateTime? FechaDuplicado { get; }
        public bool? EsDuplicado { get; }
    }
}
