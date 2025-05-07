using Enee.Core.CQRS.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.VisualizarFormulario;

public class VisualizarFormularioQuery : IQuery<Projections.FormularioTable.Formulario>
{
    public string Description => "Visualizar un formulario";
    public Guid idFormulario { get; set; }
}
