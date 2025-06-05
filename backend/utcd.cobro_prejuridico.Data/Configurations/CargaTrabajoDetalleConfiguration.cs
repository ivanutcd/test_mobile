using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using utcd.cobro_prejuridico.Domain.Modules.CargaTrabajoDetalle.Projections.CargaTrabajoDetalleTable;

namespace utcd.cobro_prejuridico.Data.Configurations
{
    public class CargaTrabajoDetalleConfiguration : IEntityTypeConfiguration<CargaTrabajoDetalle>
    {
        public void Configure(EntityTypeBuilder<CargaTrabajoDetalle> builder)
        {
            builder.ToTable("carga_trabajo_detalle", Environment.GetEnvironmentVariable("DB__SCHEMA_TABLES"));
            builder.HasKey(x => x.Id);

        }
    }
}
