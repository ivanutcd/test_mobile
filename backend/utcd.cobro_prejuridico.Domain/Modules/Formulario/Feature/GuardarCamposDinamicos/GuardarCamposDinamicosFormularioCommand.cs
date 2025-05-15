using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Command;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.GuardarCamposDinamicos
{
    public record GuardarCamposDinamicosFormularioCommand(Guid Id,
         string EstructuraFormulario) : ICommand;
}
