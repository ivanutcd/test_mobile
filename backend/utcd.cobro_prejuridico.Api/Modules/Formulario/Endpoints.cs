using Carter;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarCampoDinamicoFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.CrearFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.EditarFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.EliminarFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.GuardarComposDinamicosFormulario;
using utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.PublicarFormulario;
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
        app.CrearFormulario();
        app.EditarFormulario();
        app.EliminarFormulario();
        app.PublicarFormulario();
        app.GuardarComposDinamicosFormulario();
        app.ConsultarEstructuraFormularioId();
    }
}
