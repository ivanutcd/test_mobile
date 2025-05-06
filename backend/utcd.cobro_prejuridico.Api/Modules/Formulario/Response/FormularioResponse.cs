namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Response;

public record FormularioResponse()
{
    public string NombreTecnico { get; init; }
    public string Descripcion { get; init; }
    public string MovilidadAsociada { get; init; }
    public string Estado { get; init; }
    public string VersionFormulario { get; init; }
    public DateTime FechaCreacion { get; init; }
    public DateTime FechaModificacion { get; init; }
}
