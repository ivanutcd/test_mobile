using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Projections.FormularioRegistroTable;


namespace utcd.cobro_prejuridico.Data.Configurations
{
    public class FormularioRegistroConfiguration : IEntityTypeConfiguration<FormularioRegistro>
    {
        public void Configure(EntityTypeBuilder<FormularioRegistro> builder)
        {
            builder.ToTable("formulario_registro", Environment.GetEnvironmentVariable("DB__SCHEMA_TABLES"));
            builder.HasKey(x => x.Id);
            builder.HasIndex(x => x.ClientFormId).IsUnique();
        }
    }
}
