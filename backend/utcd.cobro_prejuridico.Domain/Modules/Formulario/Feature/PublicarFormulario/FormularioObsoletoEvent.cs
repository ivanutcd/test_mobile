using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.PublicarFormulario
{
    public class FormularioObsoletoEvent : DomainEvent<Guid>
    {
        public string Estado { get; set; }

        public FormularioObsoletoEvent(Guid id, string estado)
            : base(id)
        {
            Estado = estado;
        }
    }
}
