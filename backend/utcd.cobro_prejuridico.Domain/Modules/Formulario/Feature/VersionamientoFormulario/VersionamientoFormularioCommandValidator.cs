using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using JasperFx.Core;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VersionamientoFormulario
{
    public class VersionamientoFormularioCommandValidator
        : CommandValidatorBase<VersionamientoFormularioCommand>
    {
        public VersionamientoFormularioCommandValidator(
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
                            return;
                        }
                        Guid formularioOrigenId = entidad.FormularioBaseId ?? entidad.Id;
                        var formulariosRelacionados = repository
                                .AsQueryable()
                                .Where(x => x.FormularioBaseId == formularioOrigenId || x.Id == formularioOrigenId)
                                .ToList();
                        if (formulariosRelacionados.Any(f => f.Estado == FormularioEstado.Borrador.Value))
                        {
                            context.AddFailure(new FluentValidation.Results.ValidationFailure("Id",
                                "No se puede versionar porque existe al menos un formulario relacionado en estado Borrador.")
                            {
                                ErrorCode = "400"
                            });
                        }
                    }
                );
               
        }
    }
}
