using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario
{
    public class PublicarFormularioCommandValidator
        : CommandValidatorBase<PublicarFormularioCommand>
    {
        public PublicarFormularioCommandValidator(
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
                    }
                )
                .Must(value =>
                {
                    return !repository
                        .AsQueryable()
                        .Any(x => x.Id == value && x.Estado != FormularioEstado.Borrador.Value);
                })
                .WithMessage("El estado debe estar en 'Borrador' para publicarlo.");
        }
    }
}
