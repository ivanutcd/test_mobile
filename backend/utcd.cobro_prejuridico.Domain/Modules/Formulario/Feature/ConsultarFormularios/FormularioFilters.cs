using Enee.Core.CQRS.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

public class FormularioFilters:IPaginatedParams
{
    public string? NombreTecnico { get; set; }
    public string? MovilidadAsociada { get; set; }
    public string? Estado { get; set; }
    public int? PageSize { get; set; }
    public int? Page { get; set; }
}
