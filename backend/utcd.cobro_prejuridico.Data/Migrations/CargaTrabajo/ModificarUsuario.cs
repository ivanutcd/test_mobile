using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.CargaTrabajo;

[Migration(202507100910)]
public class ModificarUsuario(IOptions<DbSettings> dbSettings) : Migration
{
    private readonly string schema = dbSettings.Value.SchemaTables;
    private const string TableName = "CargaTrabajo";
    private const string ColumnName = "IdUsuarioCarga";

    public override void Up()
    {
        Alter.Column(ColumnName).OnTable(TableName).InSchema(schema).AsString().NotNullable();
    }

    public override void Down()
    {
        Alter.Column(ColumnName).OnTable(TableName).InSchema(schema).AsGuid().NotNullable();
    }
}
