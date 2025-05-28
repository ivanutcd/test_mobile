

using System.Text.Json;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos
{
    public class GuardarComposDinamicosFormularioCommandValidator
        : CommandValidatorBase<GuardarCamposDinamicosFormularioCommand>
    {
        public GuardarComposDinamicosFormularioCommandValidator(
            IReadOnlyRepository<Projections.FormularioTable.Formulario> repository
        )
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .Custom(
                    (value, context) =>
                    {
                        Projections.FormularioTable.Formulario entidad = repository
                            .AsQueryable()
                            .FirstOrDefault(x => x.Id == value);

                        if (entidad == null)
                        {
                            context.AddFailure("No se encontro el formulario");
                        }
                        ;
                    }
                );
            RuleFor(x => x.EstructuraFormulario)
                .NotNull()
                .WithMessage("La estructura del formulario no puede ser nula.")
                .NotEmpty()
                .WithMessage("La estructura del formulario no puede estar vacía.")
                .Must(IsJsonObjectValid)
                .WithMessage("La estructura del formulario no es un JSON válido.");
        }
        private bool IsJsonObjectValid(string estructura)
        {
            try
            {
                JsonDocument.Parse(estructura);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }

}
