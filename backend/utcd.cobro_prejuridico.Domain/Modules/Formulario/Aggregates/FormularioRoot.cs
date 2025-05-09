using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Aggregates
{
    public class FormularioRoot : AggregateRoot<Guid>
    {
        public override Guid Id { get; set; }

        public string NombreTecnico { get; set; }
        public string Descripcion { get; set; }
        public string MovilidadAsociada { get; set; }
        public string Estado { get; set; }
        public string VersionFormulario { get; set; }

        public FormularioRoot() { }

        public FormularioRoot(
            Guid id,
            string nombreTecnico,
            string descripcion,
            string movilidadAsociada,
            string estado
        )
        {
            Apply(
                NewChange(
                    new FormularioCreadoEvent(
                        id,
                        nombreTecnico,
                        descripcion,
                        movilidadAsociada,
                        estado
                    )
                )
            );
        }

        private void Apply(FormularioCreadoEvent @event)
        {
            Id = @event.AggregateId;
            NombreTecnico = @event.NombreTecnico;
            Descripcion = @event.Descripcion;
            MovilidadAsociada = @event.MovilidadAsociada;
            Estado = @event.Estado;
            Version++;
        }
    }
}
