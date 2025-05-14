using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario
{
    public class CrearFormularioCommandValidator : CommandValidatorBase<CrearFormularioCommand>
    {
        public CrearFormularioCommandValidator(
            IReadOnlyRepository<Projections.FormularioTable.Formulario> repository
        )
        {
            RuleFor(x => x.Id).NotEmpty().NotNull();

            RuleFor(x => x.NombreTecnico)
                .NotEmpty()
                .NotNull()
                .Matches("^[a-zA-Z0-9 ]*$")
                .WithMessage("{PropertyName} no debe contener caracteres especiales.")
                .Must(value =>
                {
                    return !repository.AsQueryable().Any(x => x.NombreTecnico == value);
                })
                .WithMessage("Ya existe un {PropertyName} con el nombre '{PropertyValue}'.")
                .MaximumLength(200);

            RuleFor(x => x.Descripcion).NotEmpty().NotNull().MaximumLength(2000);

            RuleFor(x => x.MovilidadAsociada).NotEmpty().NotNull();

            RuleFor(x => x.Estado)
                .NotEmpty()
                .NotNull()
                .Must(value =>
                {
                    return value == FormularioEstado.Borrador.Value;
                })
                .WithMessage("El estado inicial debe de ser Borrador.");
        }
    }
}
