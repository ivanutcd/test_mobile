using utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;
using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.ConsultarFacturas;

public class ConsultarFacturaQuery:IPaginateQuery<FacturasFilters,Facturas>
{
    public ConsultarFacturaQuery(FacturasFilters filters)
    {
        Filters = filters;
    }

    public string Description { get; } = "Consultar Query";

    public FacturasFilters Filters { get; }
}
