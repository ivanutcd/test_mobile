using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario
{
    public record EditarFormularioCommand(
        Guid Id,
        string NombreTecnico,
        string Descripcion,
        string MovilidadAsociada,
        string Estado,
        string VersionFormulario,
        bool esEditable
    ) : ICommand;
}
