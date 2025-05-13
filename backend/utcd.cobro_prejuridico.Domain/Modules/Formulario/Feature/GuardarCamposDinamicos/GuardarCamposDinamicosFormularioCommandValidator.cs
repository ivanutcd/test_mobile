

using System.Text.Json;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using JasperFx.Core;

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
                            .FindFirst(x => x.Id == value);

                        if (entidad == null)
                        {
                            context.AddFailure("No se encontro el formulario");
                        }
                        ;
                    }
                );
            //RuleFor(x => x.EstructuraFormulario)
            //    .NotNull()
            //    .WithMessage("La estructura del formulario no puede ser nula.")
            //    .NotEmpty()
            //    .WithMessage("La estructura del formulario no puede estar vacía.")
            //    .Must(IsJsonObjectValid)
            //    .WithMessage("La estructura del formulario no es un JSON válido.");
        }
        private bool IsJsonObjectValid(object estructura)
        {
            if (estructura is not string s)
                return false;

            try
            {
                JsonDocument.Parse(s);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }

}
