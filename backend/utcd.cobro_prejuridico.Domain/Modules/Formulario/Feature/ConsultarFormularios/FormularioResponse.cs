namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

public record FormularioResponse
{
    public Guid Id { get; init; }
    public string NombreTecnico { get; init; }
    public string MovilidadAsociada { get; init; }
    public string Estado { get; init; }
    public string VersionFormulario { get; init; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}
