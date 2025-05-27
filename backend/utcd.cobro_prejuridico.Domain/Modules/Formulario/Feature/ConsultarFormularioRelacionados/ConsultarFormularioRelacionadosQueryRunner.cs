using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;
using Ardalis.Specification;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularioRelacionados
{
    public class ConsultarFormularioRelacionadosQueryRunner : IQueryRunner<ConsultarFormularioRelacionadosQuery, List<FormularioRelacionadoResponse>>
    {
        public IReadOnlyRepository<Projections.FormularioTable.Formulario> Repository { get; }
        public IObjectMapper Mapper { get; }

        public ConsultarFormularioRelacionadosQueryRunner(IReadOnlyRepository<Projections.FormularioTable.Formulario> repository, IObjectMapper mapper)
        {
            Repository = repository;
            Mapper = mapper;
        }

        public async Task<List<FormularioRelacionadoResponse>> Run(ConsultarFormularioRelacionadosQuery query)
        {
            var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
            IEnumerable<Projections.FormularioTable.Formulario> formulario = await Repository.List(spec);
            IList<Projections.FormularioTable.Formulario> formulariosRelacionadosOrdenados = ObtenerFormulariosRelacionados(formulario, query.Id).OrderByDescending(s=>s.CreatedDate).ToList();

            return this.Mapper.Map<List<FormularioRelacionadoResponse>>(formulariosRelacionadosOrdenados);
        }
        private List<Projections.FormularioTable.Formulario> ObtenerFormulariosRelacionados(
           IEnumerable<Projections.FormularioTable.Formulario> todosLosFormularios,
           Guid id,
           HashSet<Guid> visitados = null)
        {
            visitados ??= new HashSet<Guid>();
            var resultado = new List<Projections.FormularioTable.Formulario>();

            if (visitados.Contains(id))
                return resultado;

            visitados.Add(id);

            Projections.FormularioTable.Formulario formularioActual = todosLosFormularios.FirstOrDefault(f => f.Id == id);
            if (formularioActual == null)
                return resultado;

            resultado.Add(formularioActual);
            if (formularioActual.FormularioBaseId.HasValue)
            {
                resultado.AddRange(ObtenerFormulariosRelacionados(
                    todosLosFormularios,
                    formularioActual.FormularioBaseId.Value,
                    visitados
                ));
            }

            var formulariosDerivados = todosLosFormularios
                .Where(f => f.FormularioBaseId == id)
                .ToList();

            foreach (Projections.FormularioTable.Formulario formularioDerivado in formulariosDerivados)
            {
                resultado.AddRange(ObtenerFormulariosRelacionados(
                    todosLosFormularios,
                    formularioDerivado.Id,
                    visitados
                ));
            }

            return resultado;
        }
    }
}
