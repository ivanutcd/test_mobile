using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;

public record EliminarFormularioCommand(Guid Id) : ICommand;
