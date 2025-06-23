using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using utcd.cobro_prejuridico.Domain.Query;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario;

public class ConsultarLogsFormularioQuery : IQuery<IPaginated<EventLog>>
{
    public string Description { get; } = "Obtener logs de eventos de forma paginada";
    public int? PageSize { get; set; }
    public int? Page { get; set; }
    public string? LogType { get; set; }
    public string? UserId { get; set; }
    public string? UserName { get; set; }
    public string? UserFullName { get; set; }
    public Guid? AggregateId { get; set; }
    public Guid? RelatedId { get; set; }
    public string? EventType { get; set; }
    public string? AggregateType { get; set; }
    public DateTime? FromDate { get; set; }
}
