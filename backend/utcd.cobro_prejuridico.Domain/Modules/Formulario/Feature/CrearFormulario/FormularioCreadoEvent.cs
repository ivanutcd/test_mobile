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
            Guid? formularioOrigenId,
            string? estructuraFormulario
        )
            : base(aggregateId)
        {
            NombreTecnico = nombreTecnico;
            Descripcion = descripcion;
            MovilidadAsociada = movilidadAsociada;
            Estado = estado;
            FormularioOrigenId = formularioOrigenId;
            EstructuraFormulario = estructuraFormulario;
        }

        public string NombreTecnico { get; }
        public string Descripcion { get; }
        public string MovilidadAsociada { get; }
        public string Estado { get; }
        public string? EstructuraFormulario { get; }
        public Guid? FormularioOrigenId { get; }
    }
}
