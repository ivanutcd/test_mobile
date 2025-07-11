using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utcd.cobro_prejuridico.Domain.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario
{
    public class AsignacionTrabajoResponse
    {
        public string IdUsuario { get; set; }
        public DateTime FechaAsignacion { get; set; }
        public string Movilidad { get; set; }
        public string Clave { get; set; }
        public object Detalle { get; set; }
        public string EstadoCaptura { get; set; }
        public string EstadoSincronizacion { get; set; }
        public string? ClientFormId { get; set; }
    }
}
