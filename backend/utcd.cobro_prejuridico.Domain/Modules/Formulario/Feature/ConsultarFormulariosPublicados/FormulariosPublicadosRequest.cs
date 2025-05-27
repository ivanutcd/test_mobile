using Enee.Core.CQRS.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormulariosPublicados;

public record FormulariosPublicadosRequest :IPaginatedParams
{
    public Guid? IdUsuario { get; set; }
    public int? PageSize { get; set; }
    public int? Page { get; set; }
}
