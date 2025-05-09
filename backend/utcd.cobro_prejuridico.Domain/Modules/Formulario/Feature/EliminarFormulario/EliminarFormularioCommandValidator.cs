using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using JasperFx.Core;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario
{
    public class EliminarFormularioCommandValidator : CommandValidatorBase<EliminarFormularioCommand>
    {
        public EliminarFormularioCommandValidator(
            IReadOnlyRepository<Projections.FormularioTable.Formulario> repository
        )
        {
            RuleFor(x => x.Id)
           .NotEmpty()
           .Custom(
               (value, context) =>
               {
                   Projections.FormularioTable.Formulario entidad = repository.AsQueryable().FindFirst(x => x.Id == value);
                  

                   if (entidad == null)
                   {
                       context.AddFailure(
                           "No se encontro el formulario"
                       );
                   }
                   ;
               }
           );
        }
    }
}
