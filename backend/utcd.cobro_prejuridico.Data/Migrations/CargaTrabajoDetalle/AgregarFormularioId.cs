using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.CargaTrabajoDetalle;

[Migration(202507100900)]
public class AgregarFormularioId(IOptions<DbSettings> dbSettings) : Migration
{
    private readonly string schema = dbSettings.Value.SchemaTables;
    private const string TableName = "CargaTrabajoDetalle";

    public override void Up()
    {
        Alter
            .Table(TableName)
            .InSchema(schema)
            .AddColumn("FormularioId")
            .AsGuid()
            .Nullable()
            .ForeignKey($"FK_{TableName}_Formulario", "Formulario", "Id");

        Alter.Column("IdUsuario").OnTable(TableName).InSchema(schema).AsString().NotNullable();

        Delete.Column("Movilidad").FromTable(TableName).InSchema(schema);
    }

    public override void Down()
    {
        Alter.Table(TableName).InSchema(schema).AddColumn("Movilidad").AsString(100).Nullable();

        Alter.Column("IdUsuario").OnTable(TableName).InSchema(schema).AsGuid().NotNullable();

        Delete.Column("FormularioId").FromTable(TableName).InSchema(schema);
    }
}
