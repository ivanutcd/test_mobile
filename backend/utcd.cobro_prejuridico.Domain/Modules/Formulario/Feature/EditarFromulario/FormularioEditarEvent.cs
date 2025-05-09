using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EditarFromulario
{
    public class FormularioEditarEvent : DomainEvent<Guid>
    {
        public string NombreTecnico { get; }
        public string Descripcion { get; }
        public string MovilidadAsociada { get; }
        public string Estado { get; }

        public FormularioEditarEvent(
            Guid aggregateId,
            string nombreTecnico,
            string descripcion,
            string movilidadAsociada,
            string estado
        )
            : base(aggregateId)
        {
            NombreTecnico = nombreTecnico;
            Descripcion = descripcion;
            MovilidadAsociada = movilidadAsociada;
            Estado = estado;
        }

      
    }
}
