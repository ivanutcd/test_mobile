using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;

namespace TestApp.Domain.LogDeEventos.Projectors;

public class BitacoraFormulario : EventLogProjector
{
    public BitacoraFormulario() : base(logType: "formulario")
    {
        
        TrackEvent<FormularioCreadoEvent>()
            .WithCustomDescription(creado => "Juan");

    }
}
