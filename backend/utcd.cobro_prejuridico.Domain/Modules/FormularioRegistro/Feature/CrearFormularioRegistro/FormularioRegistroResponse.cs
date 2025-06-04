using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public class FormularioRegistroResponse
    {
        public string ClientFormId { get; set; }
        public Guid FormId { get; set; }
        public string VersionFormulario { get; set; }
        public string Estado { get; set; }
        public List<MensajeDetalle> Respuesta { get; set; } = new();
    }
    public class MensajeDetalle
    {
        public int Codigo { get; set; }
        public string Mensaje { get; set; }
    }
}
