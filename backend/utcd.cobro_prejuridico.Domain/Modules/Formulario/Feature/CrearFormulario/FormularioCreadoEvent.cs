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
            string estado
        )
            : base(aggregateId)
        {
            NombreTecnico = nombreTecnico;
            Descripcion = descripcion;
            MovilidadAsociada = movilidadAsociada;
            Estado = estado;
        }

        public string NombreTecnico { get; }
        public string Descripcion { get; }
        public string MovilidadAsociada { get; }
        public string Estado { get; }
    }
}
