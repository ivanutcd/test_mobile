using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Enee.Core.Infraestructure.TrackingEvent.GetEventLog;


public static class Endpoints
{

    public static RouteHandlerBuilder EventLogQueryPaginated(this IEndpointRouteBuilder app)
    {
        return app.MapGet("logsNew", async ([AsParameters] GetEventLogQuery query, IQueryDispatcher dispatcher) =>
        {

            IPaginated<EventLog> result = await dispatcher.Execute(query);
            return result;

        })
        .Produces<IPaginated<Enee.Core.CQRS.Query.EventLog>>();
    }


}
