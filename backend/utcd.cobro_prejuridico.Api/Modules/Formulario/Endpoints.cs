using Carter;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.VisualizarFormulario;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario;

public class Endpoints : CarterModule
{
    public Endpoints()
        : base("/api/v1/formulario")
    {
        this.WithTags("Formulario");
    }

    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.ConsultarFormularios();
        app.ConsultarFormularioId();
    }
}
