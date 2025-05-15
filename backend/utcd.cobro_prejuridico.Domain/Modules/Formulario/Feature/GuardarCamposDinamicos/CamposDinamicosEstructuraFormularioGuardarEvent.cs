using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Common;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos
{
    public class CamposDinamicosEstructuraFormularioGuardarEvent : DomainEvent<Guid>
    {
        public string EstructuraFormulario { get; set; }

        public CamposDinamicosEstructuraFormularioGuardarEvent(Guid aggregateId, string estructuraFormulario)
            : base(aggregateId)
        {
            EstructuraFormulario = estructuraFormulario;
        }
    }
}
