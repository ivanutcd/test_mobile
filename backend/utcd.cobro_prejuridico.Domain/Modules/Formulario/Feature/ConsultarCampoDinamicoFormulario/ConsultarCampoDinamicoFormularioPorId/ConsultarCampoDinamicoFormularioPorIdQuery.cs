using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarCampoDinamicoFormulario.ConsultarCampoDinamicoFormularioPorId
{
    public class ConsultarCampoDinamicoFormularioPorIdQuery : IQuery<object>
    {
        public string Description { get; }

        public Guid Id { get; set; }
    }
}
