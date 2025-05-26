namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormulariosPublicados;

public record FormulariosPublicadosResponse
{
    public Guid Id { get; init; }
    public string NombreTecnico { get; init; }
    public string VersionFormulario { get; init; }
   public DateTime FechaPublicacion { get; init; }
   public string EstructuraFormulario { get; init; }
   public DateTime UpdatedDate { get; init; }
    public string HashUsuario {get; set; }
}
