using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario
{
    public class FormularioPublicadoEvent : DomainEvent<Guid>
    {
        public string Estado { get; set; }

        public FormularioPublicadoEvent(Guid id, string estado)
            : base(id)
        {
            Estado = estado;
        }
    }
}
