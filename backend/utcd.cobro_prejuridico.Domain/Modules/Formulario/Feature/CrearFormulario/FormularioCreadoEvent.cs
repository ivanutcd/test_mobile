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

            string versionFormulario,
            string? estructuraFormulario,
            Guid? formularioBaseId

            Guid? formularioOrigenId,
            string? estructuraFormulario

        )
            : base(aggregateId)
        {
            NombreTecnico = nombreTecnico;
            Descripcion = descripcion;
            MovilidadAsociada = movilidadAsociada;
            Estado = estado;

            VersionFormulario = versionFormulario;
            EstructuraFormulario = estructuraFormulario;
            FormularioBaseId = formularioBaseId;

            FormularioOrigenId = formularioOrigenId;
            EstructuraFormulario = estructuraFormulario;

        }

        public string NombreTecnico { get; }
        public string Descripcion { get; }
        public string MovilidadAsociada { get; }
        public string Estado { get; }

        public string VersionFormulario { get; }
        public string? EstructuraFormulario { get; set; }
        public Guid? FormularioBaseId { get; set; }

        public string? EstructuraFormulario { get; }
        public Guid? FormularioOrigenId { get; }

    }
}
