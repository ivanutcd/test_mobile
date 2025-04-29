using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Features.ConsultarFacturas;
using utcd.cobro_prejuridico.Domain.Modules.Factura.Projections.FacturaTable;
using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Factura.Features.RecuperarFacturas;

public class RecuperarFacturaQuery:IQuery<Facturas?>
{
    public RecuperaFacturaFilter Filters { get; }

    public RecuperarFacturaQuery(RecuperaFacturaFilter filters)
    {
        Filters = filters;
    }

    public string Description { get; } = "Recuperar factura";


}
