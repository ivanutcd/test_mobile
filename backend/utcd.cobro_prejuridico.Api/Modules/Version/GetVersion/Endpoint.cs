
namespace utcd.cobro_prejuridico.Api.Modules.Version.GetVersion;

public static class Endpoint
{
    public static void GetVersion(this IEndpointRouteBuilder app)
    {
        app.MapGet("/", () =>
            {
                var result = new VersionResponse(){ Version = Environment.GetEnvironmentVariable("BACKEND_VERSION") };
                return Results.Ok(result);
            })
            .Produces<VersionResponse>()
            // .RequireAuthorization()
            .WithSummary("Obtener la version del backend")
            .WithDescription("Permite obtener la version del backend")
            .WithOpenApi();
    }
}
