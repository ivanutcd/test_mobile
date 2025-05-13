using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
        public Dictionary<string, object>? EstructuraFormulario { get; set; }

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

        public void Editar(
            string nombreTecnico,
            string descripcion,
            string movilidadAsociada,
            string estado
        )
        {
            FormularioEditarEvent editar =
                new(Id, nombreTecnico, descripcion, movilidadAsociada, estado);

            Apply(NewChange(editar));
        }

        private void Apply(FormularioEditarEvent @event)
        {
            Id = @event.AggregateId;
            NombreTecnico = @event.NombreTecnico;
            Descripcion = @event.Descripcion;
            MovilidadAsociada = @event.MovilidadAsociada;
            Estado = @event.Estado;
            Version++;
        }

        public void Eliminar()
        {
            Apply(NewChange(new FormularioEliminado(Id)));
        }

        private void Apply(FormularioEliminado sucursal)
        {
            Version++;
        }

        public void PublicarFormilarioEstado(string estado)
        {
            Apply(NewChange(new FormularioPublicadoEvent(this.Id, estado)));
        }

        private void Apply(FormularioPublicadoEvent @event)
        {
            Estado = @event.Estado;
            Version++;
        }
        public void GuardarEstructuraFormulario( Dictionary<string, object> estructuraFormulario)
        {
            Apply(NewChange(new CamposDinamicosEstructuraFormularioGuardarEvent(this.Id, estructuraFormulario)));
        }

        private void Apply(CamposDinamicosEstructuraFormularioGuardarEvent @event)
        {
            EstructuraFormulario = @event.EstructuraFormulario;
            Version++;
        }
    }
}
