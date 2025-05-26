using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Microsoft.AspNetCore.Mvc;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularioRelacionados;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.ConsultarFormularioRelacionados;

public static class Endpoint
{
    public static void ConsultarFormulariosRelacionados(this IEndpointRouteBuilder app)
    {
        app.MapGet(
                "/consultar-formularios-relacionado{id}",
                   async (
                       [FromRoute] Guid id,
                    IQueryDispatcher dispatcher
                   ) =>
                   {
                       List<FormularioRelacionadoResponse> result = await dispatcher.Execute(
                       new ConsultarFormularioRelacionadosQuery()
                       {
                           Id = id,
                          
                       });
                       return result;
                   }
               
            )
            .Produces<IEnumerable<FormularioRelacionadoResponse>>()
            .WithSummary("Listado formulario")
            .WithDescription("Permite listar formularios")
            .WithOpenApi();
    }
}
