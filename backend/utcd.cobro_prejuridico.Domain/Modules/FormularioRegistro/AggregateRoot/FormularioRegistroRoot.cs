using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;
using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.AggregateRoot
{
    public class FormularioRegistroRoot : AggregateRoot<Guid>
    {
        public override Guid Id { get; set; }
        public string ClientFormId { get; set; } = string.Empty;
        public Guid IdUsuario { get; set; }
        public DateTime FechaInicio { get; set; }
        public string VersionFormulario { get; set; } = string.Empty;
        public string Data { get; set; } = string.Empty;

        public Guid FormularioId { get; set; }

        public FormularioRegistroRoot() { }

        public FormularioRegistroRoot(
            Guid id,
            string clientFormId,
            Guid idUsuario,
            DateTime fechaInicio,
            string versionFormulario,
            string data,
            Guid formularioId
        )
        {
            Apply(
                NewChange(
                    new FormularioRegistroCreadoEvent(
                        id,
                        clientFormId,
                        idUsuario,
                        fechaInicio,
                        versionFormulario,
                        data,
                        formularioId
                    )
                )
            );
        }

        private void Apply(FormularioRegistroCreadoEvent @event)
        {
            Id = @event.AggregateId;
            ClientFormId = @event.ClientFormId;
            IdUsuario = @event.IdUsuario;
            FechaInicio = @event.FechaInicio;
            VersionFormulario = @event.VersionFormulario;
            Data = @event.Data;
            FormularioId = @event.FormularioId;
            Version++;
        }

    }
}
