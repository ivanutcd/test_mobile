using Carter;
using Enee.IoC.Architecture.Endpoints.TrackingEvent;

namespace utcd.cobro_prejuridico.Api.Modules.Logs;

public class Endpoints : CarterModule
{
    public Endpoints()
        : base("/api/v1/")
    {
        this.WithTags("Logs");
    }

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.EventLogQueryPaginated();
    }
}
