using Enee.Core.CQRS.Query;
using Enee.Core.Domain;

namespace utcd.cobro_prejuridico.Domain.Query;

/// <summary>
///     Consulta paginada a la base de datos
/// </summary>
/// <typeparam name="TPaginatedParams"></typeparam>
public interface IPaginateQuery<out TPaginatedParams,TResult> : IQuery<IPaginated<TResult>> where TPaginatedParams : IPaginatedParams
{
    /// <summary>
    /// Parámetros de la consulta
    /// </summary>
    public TPaginatedParams Filters { get; }
}
