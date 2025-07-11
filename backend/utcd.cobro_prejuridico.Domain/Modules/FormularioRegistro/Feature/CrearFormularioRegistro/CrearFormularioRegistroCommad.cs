using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public record CrearFormularioRegistroCommad(List<DatosFormularioDto> listaFormularioDatos);

    public class DatosFormularioDto
    {
        public string ClientFormId { get; set; }
        public Guid FormId { get; set; }
        public string VersionFormulario { get; set; }
        public string IdUsuario { get; set; }
        public DateTime FechaInicio { get; set; }
        public string Datos { get; set; }
    }
}
