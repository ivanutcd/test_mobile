using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public class FormularioRegistroCreadoEvent
    : DomainEvent<Guid>
    {
        public FormularioRegistroCreadoEvent(
            Guid aggregateId,
            string clientFormId,
            Guid idUsuario,
            DateTime fechaInicio,
            string versionFormulario,
            string data,
            Guid formularioId

        )
            : base(aggregateId)
        {
            ClientFormId = clientFormId;
            IdUsuario = idUsuario;
            FechaInicio = fechaInicio;
            VersionFormulario = versionFormulario;
            Data = data;
            FormularioId = formularioId;

        }

        public string ClientFormId { get; set; } 
        public Guid IdUsuario { get; set; }
        public DateTime FechaInicio { get; set; }
        public string VersionFormulario { get; set; } 
        public string Data { get; set; }
        public Guid FormularioId { get; set; }
    }
}
