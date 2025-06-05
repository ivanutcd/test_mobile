using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Common;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.CargaTrabajoDetalle.Projections.CargaTrabajoDetalleTable
{
    public class CargaTrabajoDetalle : EntityAuditable<Guid>, IEntity<Guid>
    {

        public Guid IdUsuario { get; set; }
        public DateTime FechaAsignacion { get; set; }
        public string Movilidad { get; set; }
        public string Clave { get; set; }
        public string Detalle { get; set; } 
        public string EstadoCaptura { get; set; } 
        public string EstadoSincronizacion { get; set; }
        public string? ClientFormId { get; set; }

        #region Navegación
        public Guid CargaTrabajoId { get; set; }
        public CargaTrabajo.Projections.CargaTrabajoTable.CargaTrabajo CargaTrabajo { get; set; }
        #endregion
    }
}
