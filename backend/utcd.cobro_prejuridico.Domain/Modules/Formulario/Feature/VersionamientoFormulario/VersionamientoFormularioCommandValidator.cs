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
                        Projections.FormularioTable.Formulario formularioInicial = repository
                            .AsQueryable()
                            .FindFirst(x => x.Id == value);

                        if (formularioInicial == null)
                        {
                            context.AddFailure("No se encontro el formulario");
                            return;
                        }
                        var formulariosRelacionados = new List<Projections.FormularioTable.Formulario>();
                        Projections.FormularioTable.Formulario formularioEnCadena = formularioInicial;
                        while (formularioEnCadena != null)
                        {
                            formulariosRelacionados.Add(formularioEnCadena);

                            if (formularioEnCadena.FormularioBaseId == null)
                                break;

                            formularioEnCadena = repository.AsQueryable().FindFirst(x => x.Id == formularioEnCadena.FormularioBaseId);
                        }

                        void RecorrerHaciaUltimaVersion(Guid id)
                        {
                            var formulariosDerivados = repository.AsQueryable()
                                .Where(x => x.FormularioBaseId == id)
                                .ToList();

                            foreach (Projections.FormularioTable.Formulario version in formulariosDerivados)
                            {
                                formulariosRelacionados.Add(version);
                                RecorrerHaciaUltimaVersion(version.Id);
                            }
                        }

                        RecorrerHaciaUltimaVersion(formularioInicial.Id);
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
