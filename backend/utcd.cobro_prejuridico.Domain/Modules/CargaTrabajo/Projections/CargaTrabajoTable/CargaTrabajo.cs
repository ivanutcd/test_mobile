using Enee.Core.Common;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.CargaTrabajo.Projections.CargaTrabajoTable
{
    public class CargaTrabajo : EntityAuditable<Guid>, IEntity<Guid>
    {
        public Guid IdUsuarioCarga { get; set; }
        public DateTime FechaCarga { get; set; }
        public DateTime FechaAsignacion { get; set; }
        public string Movilidad { get; set; }

    }
}
