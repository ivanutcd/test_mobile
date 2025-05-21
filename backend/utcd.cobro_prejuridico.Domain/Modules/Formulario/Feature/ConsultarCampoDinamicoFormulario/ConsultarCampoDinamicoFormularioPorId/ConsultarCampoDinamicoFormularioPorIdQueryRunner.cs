using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarCampoDinamicoFormulario.ConsultarCampoDinamicoFormularioPorId
{
    public class ConsultarCampoDinamicoFormularioPorIdQueryRunner(IReadOnlyRepository<Projections.FormularioTable.Formulario> formularioRepository)
    : IQueryRunner<ConsultarCampoDinamicoFormularioPorIdQuery, object>
    {
        public async Task<object?> Run(ConsultarCampoDinamicoFormularioPorIdQuery query)
        {
            SpecificationGeneric<Projections.FormularioTable.Formulario>? formulario = new();
            formulario.Query.Where(x => x.Id == query.Id);
            Projections.FormularioTable.Formulario? estructuraFormulario = await formularioRepository.FirstOrDefault(formulario);
            if (formulario == null || string.IsNullOrWhiteSpace(estructuraFormulario.EstructuraFormulario))
            {
                return null;
            }
            var convertirStrinaObjeto = estructuraFormulario.EstructuraFormulario;
            object obj = JsonSerializer.Deserialize<Dictionary<string, object>>(convertirStrinaObjeto);
            return obj;
        }
    }
}

