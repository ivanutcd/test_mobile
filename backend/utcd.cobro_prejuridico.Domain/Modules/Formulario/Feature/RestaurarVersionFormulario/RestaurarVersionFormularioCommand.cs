using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.RestaurarVersionFormulario;

public record RestaurarVersionFormularioCommand(Guid Id) : ICommand;
