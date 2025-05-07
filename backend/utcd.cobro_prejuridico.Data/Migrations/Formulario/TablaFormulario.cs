using Enee.Core.Migrations.Utlis;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Formulario;

[Migration(202505060825)]
public class TablaFormulario(IOptions<DbSettings> dbSetting) : Migration
{
    public override void Up()
    {
        var schema = dbSetting.Value.SchemaTables;
        Create.Table("Formulario")
            .InSchema(schema)
            .WithIdColumn()
            .NotNullable()
            .WithColumn("NombreTecnico")
            .AsString(200)
            .NotNullable()
            .WithColumn("Descripcion")
            .AsString()
            .NotNullable()
            .WithColumn("MovilidadAsociada")
            .AsString()
            .NotNullable()
            .WithColumn("Estado")
            .AsString()
            .NotNullable()
            .WithColumn("VersionFormulario")
            .AsString()
            .NotNullable()
            .WithAuditableFields();
    }

    public override void Down()
    {
        var schema = dbSetting.Value.SchemaTables;
        Delete.Table("Formulario").InSchema(schema);
    }
}
