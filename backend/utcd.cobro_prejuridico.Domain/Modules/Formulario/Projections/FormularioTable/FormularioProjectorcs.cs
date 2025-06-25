using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.DuplicarFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable
{
    public class FormularioProjectorcs : TableProjector<Formulario>
    {
        public FormularioProjectorcs()
        {
            Create<FormularioCreadoEvent>(
                (@event, table) =>
                {
                    table.Id = @event.AggregateId;
                    table.NombreTecnico = @event.NombreTecnico;
                    table.Descripcion = @event.Descripcion;
                    table.MovilidadAsociada = @event.MovilidadAsociada;
                    table.Estado = @event.Estado;
                    table.VersionFormulario = @event.VersionFormulario;
                    table.EstructuraFormulario = @event.EstructuraFormulario;
                    table.FormularioBaseId = @event.FormularioBaseId;
                    table.EsEditable = @event.EsEditable;

                }
            );
            Project<FormularioEditarEvent>(
                (evento, table) =>
                {
                    table.Id = evento.AggregateId;
                    table.NombreTecnico = evento.NombreTecnico;
                    table.Descripcion = evento.Descripcion;
                    table.MovilidadAsociada = evento.MovilidadAsociada;
                    table.Estado = evento.Estado;
                    table.VersionFormulario = string.Empty;
                    table.EsEditable = evento.EsEditado;
                }
            );
            Deleted<FormularioEliminado>();
            Project<FormularioPublicadoEvent>(
                (@event, tabla) =>
                {
                    tabla.Estado = @event.Estado;
                }
            );
            Project<CamposDinamicosEstructuraFormularioGuardarEvent>(
               (@event, tabla) =>
               {
                   tabla.EstructuraFormulario = @event.EstructuraFormulario;
               }
           );
            Project<FormularioObsoletoEvent>(
              (@event, tabla) =>
              {
                  tabla.Estado = @event.Estado;
              }
          );
        }
    }
}
