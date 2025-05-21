using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VersionamientoFormulario;

public record VersionamientoFormularioCommand(Guid Id) : ICommand;


