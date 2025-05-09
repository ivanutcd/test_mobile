using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;

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
                    table.VersionFormulario = string.Empty;
                }
            );
        }
    }
}
