using Enee.Core.CQRS.Query;
using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularioRelacionados;

public class ConsultarFormularioRelacionadosQuery: IQuery<List<FormularioRelacionadoResponse>>
{
    public string Description { get; } = "Consultar Query";
    public Guid Id { get; set; }
}
