using Enee.Core.Events;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Events.AlmacenCreado;

public class EnviarCorreoDeNotificacion:IEventHandler<Features.CrearAlmacen.AlmacenCreado>
{

    public Task Handle(Features.CrearAlmacen.AlmacenCreado @event)
    {
        Console.WriteLine("Envio de correo de notificacion");
        return Task.CompletedTask;
    }
}
