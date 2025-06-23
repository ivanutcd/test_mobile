using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario;

public record  LogFormularioRequest : IPaginatedParams
{
    public string? NombreTecnico { get; init; }
    public string? MovilidadAsociada { get; init; }
    public string? Estado { get; init; }
    public string? GeneralSearch { get; init; }
    public int? PageSize { get; set; }
    public int? Page { get; set; }
}
