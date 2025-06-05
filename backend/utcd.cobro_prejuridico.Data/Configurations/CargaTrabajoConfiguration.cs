using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using utcd.cobro_prejuridico.Domain.Modules.CargaTrabajo.Projections.CargaTrabajoTable;

namespace utcd.cobro_prejuridico.Data.Configurations
{
    public class CargaTrabajoConfiguration : IEntityTypeConfiguration<CargaTrabajo>
    {
        public void Configure(EntityTypeBuilder<CargaTrabajo> builder)
        {
            builder.ToTable("carga_trabajo", Environment.GetEnvironmentVariable("DB__SCHEMA_TABLES"));
            builder.HasKey(x => x.Id);

        }
    }
}
