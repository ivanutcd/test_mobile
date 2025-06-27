using Carter;
using utcd.cobro_prejuridico.Api.Modules.Logs.ConsultarLogFormulario;

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
        app.ConsultarLogFormularios();
    }
}
