using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Projections.FormularioRegistroTable
{
    public class FormularioRegistroProjector : TableProjector<FormularioRegistro>
    {
        public FormularioRegistroProjector(IWritableRepository<FormularioRegistro> destinatario)
        {
            Create<FormularioRegistroCreadoEvent>(
                (evento, tabla) =>
                {
                    tabla.Id = evento.AggregateId;
                    tabla.ClientFormId = evento.ClientFormId;
                    tabla.IdUsuario = evento.IdUsuario;
                    tabla.FechaInicio = evento.FechaInicio;
                    tabla.VersionFormulario = evento.VersionFormulario;
                    tabla.Data = evento.Data;
                    tabla.FormularioId = evento.FormularioId;
                }

            );
           
        }
    }
}
