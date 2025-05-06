using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

public class ConsultarFormularioQuery:IPaginateQuery<FormularioFilters,Projections.FormularioTable.Formulario>
{
    public ConsultarFormularioQuery(FormularioFilters filters)
    {
        Filters = filters;
    }

    public string Description { get; } = "Consultar Query";
    public FormularioFilters Filters { get; }
}
