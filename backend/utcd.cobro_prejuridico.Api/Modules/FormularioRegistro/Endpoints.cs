using Carter;
using utcd.cobro_prejuridico.Api.Modules.FormularioRegistro.Feature.CrearFormularioRegistro;

namespace utcd.cobro_prejuridico.Api.Modules.FormularioRegistro
{
    public class Endpoints : CarterModule
    {
        public Endpoints()
            : base("/api/v1/formulario-registro")
        {
            this.WithTags("Formulario Registro");
        }

        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.CrearFormulariosRegistro();
          
        }
    }
}
