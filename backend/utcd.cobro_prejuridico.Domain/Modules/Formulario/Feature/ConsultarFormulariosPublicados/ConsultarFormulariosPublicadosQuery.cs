
using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormulariosPublicados;

public class ConsultarFormulariosPublicadosQuery : IPaginateQuery<FormulariosPublicadosRequest,FormulariosPublicadosResponse>
{
    public ConsultarFormulariosPublicadosQuery(FormulariosPublicadosRequest request)
    {
        Request = request;
    }

    public string Description { get; } = "Consultar Query";
    public FormulariosPublicadosRequest Request { get; }
}
