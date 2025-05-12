using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario
{
    public record PublicarFormularioCommand(Guid Id) : ICommand;
}
