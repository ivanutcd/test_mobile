using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public class CrearFormularioCommand : ICommand
    {
        public CrearFormularioCommand(
            Guid id,
            string nombreTecnico,
            string descripcion,
            string movilidadAsociada,
            string estado
        )
        {
            Id = id;
            NombreTecnico = nombreTecnico;
            Descripcion = descripcion;
            MovilidadAsociada = movilidadAsociada;
            Estado = estado;
        }

        public Guid Id { get; }
        public string NombreTecnico { get; }
        public string Descripcion { get; }
        public string MovilidadAsociada { get; }
        public string Estado { get; }
    }
}
