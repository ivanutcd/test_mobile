using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public class CrearFormularioRegistroCommadValidator : CommandValidatorBase<CrearFormularioRegistroCommad>
    {
        public CrearFormularioRegistroCommadValidator()
        {
            RuleFor(x => x.listaFormularioDatos)
               .NotNull()
               .WithMessage("Debe enviar una lista de formularios.")
               .NotEmpty()
               .WithMessage("La lista de formularios no puede estar vacía.");
        }
    }
}
