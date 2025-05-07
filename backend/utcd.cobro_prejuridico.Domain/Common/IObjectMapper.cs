namespace utcd.cobro_prejuridico.Domain.Common;

public interface IObjectMapper
{
    void AddCustomMapping<TSource, TDestination>(Action<TSource, TDestination> action);

    TDestination Map<TDestination>(object source);

    TDestination Map<TSource, TDestination>(TSource source);
}
