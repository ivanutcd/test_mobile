using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.CrearFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario
{
    public class EditarFormularioCommandValidator : CommandValidatorBase<EditarFormularioCommand>
    {
        public EditarFormularioCommandValidator(
            IReadOnlyRepository<Projections.FormularioTable.Formulario> repository
        )
        {
            RuleFor(x => x.NombreTecnico)
                .NotEmpty()
                .NotNull()
                .Matches("^[a-zA-Z0-9_]*$")
                .WithMessage("{PropertyName} no debe contener caracteres especiales.")
                .Must(
                    (request, nombreTecnico) =>
                    {
                        return !repository
                            .AsQueryable()
                            .Any(x => x.NombreTecnico == nombreTecnico && x.Id != request.Id);
                    }
                )
                .WithMessage("Ya existe un {PropertyName} con el nombre '{PropertyValue}'.")
                .MaximumLength(200);

            RuleFor(x => x.Descripcion).NotEmpty().NotNull().MaximumLength(2000);

            RuleFor(x => x.MovilidadAsociada).NotEmpty().NotNull();

            RuleFor(x => x.Estado).NotEmpty().NotNull();
        }
    }
}
