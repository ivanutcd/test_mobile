using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularioRelacionados;

public record FormularioRelacionadoResponse
{
    public Guid Id { get; init; }
    public string NombreTecnico { get; init; }
    public string MovilidadAsociada { get; init; }
    public string Estado { get; init; }
    public string VersionFormulario { get; init; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public string? CreatedBy { get; set; }
}
