using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utcd.cobro_prejuridico.Domain.Common
{
    public static class CodigosRespuesta
    {
        public static (int codigo, string mensaje) RegistroExitoso = (000, "Registro procesado con éxito");
        public static (int codigo, string mensaje) DatosIncompletos = (400, "Datos incompletos o malformados");
        public static (int codigo, string mensaje) FormularioNoEncontrado = (401, "Formulario no encontrado");
        public static (int codigo, string mensaje) FormularioNoPublicado = (402, "Formulario no publicado");
        public static (int codigo, string mensaje) FormularioYaRegistrado = (403, "Formulario ya contiene un registro para clientFormId");
        public static (int codigo, string mensaje) ErrorInterno = (500, "Error interno:");
    }
    public static class EstadoRespuesta
    {
        public const string Exito = "Éxito";
        public const string Error = "Error";
    }
}
