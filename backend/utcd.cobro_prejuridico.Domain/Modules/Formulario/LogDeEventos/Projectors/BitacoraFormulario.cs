using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;

namespace TestApp.Domain.LogDeEventos.Projectors;

public class BitacoraFormulario : EventLogProjector
{
    public BitacoraFormulario()
        : base(logType: "formulario")
    {
        TrackEvent<FormularioCreadoEvent>()
            .WithCustomDescription(creado => "Creacion de formulario");

        TrackEvent<FormularioEditarEvent>()
            .WithCustomDescription(editado => "Edicion de formulario");

        TrackEvent<FormularioEliminado>()
            .WithCustomDescription(eliminado => "Formulario eliminado");
    }
}
