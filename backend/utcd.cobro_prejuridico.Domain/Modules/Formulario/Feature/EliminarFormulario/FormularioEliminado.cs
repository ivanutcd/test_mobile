using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.EliminarFormulario
{
    public class FormularioEliminado : DomainEvent<Guid>
    {
        public FormularioEliminado(Guid aggregateId)
            : base(aggregateId) { }
    }
}
