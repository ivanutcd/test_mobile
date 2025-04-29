using Enee.Core.CQRS.Validation;
using FluentValidation;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.CrearFactura;

public class CrearFacturaValidator:CommandValidatorBase<CrearFacturaCommand>
{
    public CrearFacturaValidator()
    {
        RuleFor(x => x.Numero).NotEmpty();
    }
}
