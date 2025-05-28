using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using FluentValidation;
using JasperFx.Core;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.RestaurarVersionFormulario
{
    public class RestaurarVersionFormularioCommandValidatos : CommandValidatorBase<RestaurarVersionFormularioCommand>
    {
        public RestaurarVersionFormularioCommandValidatos(
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

                        if (formularioInicial.Estado != FormularioEstado.Obsoleto.Value)
                        {
                            context.AddFailure("Solo se permite formularios obsoletos");
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
