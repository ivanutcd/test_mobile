using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.DuplicarFormulario;

public record DuplicarFormularioCommand (Guid Id) : ICommand;

