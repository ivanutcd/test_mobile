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
                        Projections.FormularioTable.Formulario formularioActual = repository
                            .AsQueryable()
                            .FindFirst(x => x.Id == value);

                        if (formularioActual == null)
                        {
                            context.AddFailure("No se encontro el formulario");
                            return;
                        }
                        var relacionados = new List<Projections.FormularioTable.Formulario>();
                        Projections.FormularioTable.Formulario actual = formularioActual;
                        while (actual != null)
                        {
                            relacionados.Add(actual);

                            if (actual.FormularioBaseId == null)
                                break;

                            actual = repository.AsQueryable().FindFirst(x => x.Id == actual.FormularioBaseId);
                        }

                        void AgregarHijos(Guid id)
                        {
                            var hijos = repository.AsQueryable()
                                .Where(x => x.FormularioBaseId == id)
                                .ToList();

                            foreach (Projections.FormularioTable.Formulario hijo in hijos)
                            {
                                relacionados.Add(hijo);
                                AgregarHijos(hijo.Id);
                            }
                        }

                        AgregarHijos(formularioActual.Id);
                        if (relacionados.Any(f => f.Estado == FormularioEstado.Borrador.Value))
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
