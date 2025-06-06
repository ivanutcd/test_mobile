using System.Text.Json;
using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Common;
namespace utcd.cobro_prejuridico.Domain.Modules.CargaTrabajoDetalle.Feature.ConsultarAsignacionesDiariasPorUsuario
{
    public class ConsultarAsignacionesDiariasPorUsuarioIdQueryRunner : IQueryRunner<ConsultarAsignacionesDiariasPorUsuarioIdQuery, List<AsignacionTrabajoResponse>>
    {
        public IReadOnlyRepository<Projections.CargaTrabajoDetalleTable.CargaTrabajoDetalle> Repository { get; }
        public IObjectMapper Mapper { get; }

        public ConsultarAsignacionesDiariasPorUsuarioIdQueryRunner(IReadOnlyRepository<Projections.CargaTrabajoDetalleTable.CargaTrabajoDetalle> repository, IObjectMapper mapper)
        {
            Repository = repository;
            Mapper = mapper;
        }

        public async Task<List<AsignacionTrabajoResponse>> Run(ConsultarAsignacionesDiariasPorUsuarioIdQuery query)
        {

            var fechaUtc = DateTime.SpecifyKind(query.FechaAsignacion.Date, DateTimeKind.Utc);

            SpecificationGeneric<Projections.CargaTrabajoDetalleTable.CargaTrabajoDetalle> spec = new();

            spec.Query.Where(x =>
                x.IdUsuario == query.IdUsuario &&
                x.FechaAsignacion.Date == fechaUtc.Date);

            IEnumerable<Projections.CargaTrabajoDetalleTable.CargaTrabajoDetalle> asignaciones = await Repository.List(spec);

            return asignaciones.Select(x => new AsignacionTrabajoResponse
            {
                IdUsuario = x.IdUsuario,
                FechaAsignacion = x.FechaAsignacion,
                Movilidad = x.Movilidad,
                Clave = x.Clave,
                Detalle = JsonSerializer.Deserialize<object>(x.Detalle), 
                EstadoCaptura = x.EstadoCaptura,
                EstadoSincronizacion = x.EstadoSincronizacion,
                ClientFormId = x.ClientFormId
            }).ToList();
        }
    }
}
