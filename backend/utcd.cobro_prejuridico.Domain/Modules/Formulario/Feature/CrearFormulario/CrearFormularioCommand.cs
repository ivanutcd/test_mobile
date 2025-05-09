using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public record CrearFormularioCommand(
        Guid Id,
        string NombreTecnico,
        string Descripcion,
        string MovilidadAsociada,
        string Estado
    ) : ICommand;
}
