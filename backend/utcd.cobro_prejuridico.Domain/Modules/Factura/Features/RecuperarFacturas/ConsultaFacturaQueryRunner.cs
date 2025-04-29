using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.RecuperarFacturas;

public class RecuperarFacturaQueryRunner : IQueryRunner<RecuperarFacturaQuery, Facturas?>
{
    public IReadOnlyRepository<Facturas> Repository { get; }

    public RecuperarFacturaQueryRunner(IReadOnlyRepository<Facturas> repository)
    {
        Repository = repository;
    }

    public async Task<Facturas?> Run(RecuperarFacturaQuery query)
    {
        var spec = new SpecificationGeneric<Facturas>();
        spec.Query.Where(x => x.Id == query.Filters.Id);

        return await Repository.FirstOrDefault(spec);
    }
}
