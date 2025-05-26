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
            IEnumerable<Projections.FormularioTable.Formulario> paginatedFormulario = await Repository.List(spec);
            IList<Projections.FormularioTable.Formulario> relacionadosOrdenados = GetFormulariosRelacionados(paginatedFormulario, query.Id);
            return this.Mapper.Map<List<FormularioRelacionadoResponse>>(relacionadosOrdenados);
        }
        List<Projections.FormularioTable.Formulario> GetFormulariosRelacionados(
                                                     IEnumerable<Projections.FormularioTable.Formulario> all,
                                                     Guid id,
                                                     HashSet<Guid> visitados = null)
        {
            visitados ??= new HashSet<Guid>();
            var resultado = new List<Projections.FormularioTable.Formulario>();

            if (visitados.Contains(id)) return resultado;

            visitados.Add(id);

            Projections.FormularioTable.Formulario formulario = all.FirstOrDefault(f => f.Id == id);
            if (formulario == null) return resultado;

            resultado.Add(formulario);

            if (formulario.FormularioBaseId.HasValue)
            {
                resultado.AddRange(GetFormulariosRelacionados(all, formulario.FormularioBaseId.Value, visitados));
            }

            var hijos = all.Where(f => f.FormularioBaseId == id).ToList();
            foreach (Projections.FormularioTable.Formulario hijo in hijos)
            {
                resultado.AddRange(GetFormulariosRelacionados(all, hijo.Id, visitados));
            }

            return resultado;
        }
    }
}
