using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.ConsultarAlmacen;
using utcd.cobro_prejuridico.Domain.Modules.Almacen.Projections.Almacen;

namespace utcd.cobro_prejuridico.Api.Modules.Almacen.Features.RecuperarAlmacenes;

public static class Endpoint
{
    public static void RecuperarAlmacenes(this IEndpointRouteBuilder app)
    {
        app.MapGet(
            "/",
            async (
                [AsParameters] ConsultaAlmacenPaginado query,
                IQueryDispatcher dispatcher
            ) =>
            {
                IPaginated<AlmacenDocumento>? result = await dispatcher.Execute(query);
                return result;
            }).Produces<IPaginated<AlmacenDocumento>>()
            .WithSummary("Obtiene listado de almacenes")
            .WithDescription("Listar varios almacenes.")
            .WithOpenApi();
    }
}
