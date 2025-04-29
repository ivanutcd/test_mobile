using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Modules.Almacen.Projections.Almacen;

namespace utcd.cobro_prejuridico.Domain.Modules.Almacen.Features.ConsultarAlmacen;

public class ConsultaAlmacenPaginado:IQuery<IPaginated<AlmacenDocumento>>, IPaginatedParams
{
    public string Description { get; } = "Consulta de almacenes en forma paginada";


    public string? NombreSucursal { get; set; }
    public int? PageSize { get; set; }
    public int? Page { get; set; }
}
