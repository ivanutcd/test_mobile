namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.VisualizarFormulario;

public record FormularioIdResponse
{
    public Guid Id { get; init; }
    public string NombreTecnico { get; init; }
    public string MovilidadAsociada { get; init; }
    public string Estado { get; init; }
    public string VersionFormulario { get; init; }
}
