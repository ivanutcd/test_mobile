using Enee.Core.CQRS.Validation;
using Enee.Core.Domain.Repository;
using utcd.cobro_prejuridico.Domain.Modules.Almacen.Projections.Almacen;
using FluentValidation;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.EliminarAlmacen;

public class EliminarAlmacenValidator:CommandValidatorBase<EliminarAlmacenCommand>
{
    public IReadOnlyDocumentRepository<AlmacenDocumento> Repository { get; }

    public EliminarAlmacenValidator(IReadOnlyDocumentRepository<AlmacenDocumento> repository)
    {
        Repository = repository;
        RuleFor(x => x.Id).NotEmpty().NotNull().Custom(VerificarExistaEnTablaDocumento);
    }

    private void VerificarExistaEnTablaDocumento(Guid id, ValidationContext<EliminarAlmacenCommand> arg2)
    {
        var existe = this.Repository.AsQueryable().Any(x => x.Id == id);

        if (!existe)
        {
            arg2.AddFailure("No existe elemento que desea eliminar");
        }
    }
}
