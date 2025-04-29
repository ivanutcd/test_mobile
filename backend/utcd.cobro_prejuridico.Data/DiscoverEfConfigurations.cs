using Ardalis.EFCore.Extensions;
using Enee.Core.Common;
using Enee.Core.Data.EFCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace utcd.cobro_prejuridico.Data
{


    public class DiscoverEfConfigurations : IModelBuildingStrategy
    {
        /// <summary>
        /// Busca configuraciones disponibles
        /// </summary>
        /// <param name="modelBuilder"></param>
        public void Invoke(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyAllConfigurationsFromCurrentAssembly();

            IEnumerable<IMutableEntityType>? entites = modelBuilder.Model
                .GetEntityTypes();

            foreach (IMutableEntityType? entityType in entites)
            {
                if (typeof(IAuditable).IsAssignableFrom(entityType.ClrType))
                {
                    entityType.AddSoftDeleteQueryFilter();
                }
            }
        }


    }
}
