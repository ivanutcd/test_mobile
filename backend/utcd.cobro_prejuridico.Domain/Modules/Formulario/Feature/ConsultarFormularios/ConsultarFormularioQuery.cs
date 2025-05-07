using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

public class ConsultarFormularioQuery:IPaginateQuery<FormularioRequest,FormularioResponse>
{
    public ConsultarFormularioQuery(FormularioRequest request)
    {
        Request = request;
    }

    public string Description { get; } = "Consultar Query";
    public FormularioRequest Request { get; }
}
