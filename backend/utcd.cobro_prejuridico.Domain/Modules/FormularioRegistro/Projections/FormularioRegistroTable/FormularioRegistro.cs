using Enee.Core.Common;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Projections.FormularioRegistroTable
{
    public class FormularioRegistro : EntityAuditable<Guid>, IEntity<Guid>
    {
        public string ClientFormId { get; set; }
        public string IdUsuario { get; set; }
        public DateTime FechaInicio { get; set; }
        public string VersionFormulario { get; set; }
        public string Data { get; set; }

        #region Foreign Key Navigation
        public Guid FormularioId { get; set; }
        #endregion
    }
}
