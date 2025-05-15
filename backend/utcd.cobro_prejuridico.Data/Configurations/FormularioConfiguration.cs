using System;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;

namespace utcd.cobro_prejuridico.Data.Configurations;

public class FormularioConfiguration: IEntityTypeConfiguration<Formulario>
{
    public void Configure(EntityTypeBuilder<Formulario> builder)
    {
        builder.ToTable("formulario", Environment.GetEnvironmentVariable("DB__SCHEMA_TABLES"));
        builder.HasKey(x=>x.Id);
        builder.HasIndex(x => x.NombreTecnico).IsUnique();

    }
}
