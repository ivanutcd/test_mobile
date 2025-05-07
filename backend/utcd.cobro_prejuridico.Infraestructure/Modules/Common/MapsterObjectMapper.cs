using Mapster;
using utcd.cobro_prejuridico.Domain.Common;


namespace UtcdRefacturacion.Infraestructure.Modules.Common;

public class MapsterObjectMapper: IObjectMapper
{
    public void AddCustomMapping<TSource, TDestination>(Action<TSource, TDestination> action)
    {
        TypeAdapterConfig<TSource, TDestination>.NewConfig().AfterMapping(action);
    }

    public TDestination Map<TDestination>(object source)
    {
        return source.Adapt<TDestination>();
    }

    public TDestination Map<TSource, TDestination>(TSource source)
    {
        return source.Adapt<TDestination>();
    }
}
