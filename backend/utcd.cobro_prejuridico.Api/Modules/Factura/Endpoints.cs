using Carter;
using utcd.cobro_prejuridico.Api.Modules.Factura.Features.ConsultarFacturas;
using utcd.cobro_prejuridico.Api.Modules.Factura.Features.CrearFacturas;
using utcd.cobro_prejuridico.Api.Modules.Factura.Features.EditarFacturas;
using utcd.cobro_prejuridico.Api.Modules.Factura.Features.EliminarFactura;
using utcd.cobro_prejuridico.Api.Modules.Factura.Features.EliminarItemFactura;
using utcd.cobro_prejuridico.Api.Modules.Factura.Features.RecuperarFactura;

namespace utcd.cobro_prejuridico.Api.Modules.Factura;

public class Endpoints : CarterModule
{
    public Endpoints() : base("/api/v1/facturas")
    {
        this.WithTags("Facturas");

    }
    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.CrearFactura();
        app.EditarFactura();
        app.RecuperarFactura();
        app.ConsultarFacturas();
        app.EliminarFactura();
        app.EliminarItemFactura();
    }
}
