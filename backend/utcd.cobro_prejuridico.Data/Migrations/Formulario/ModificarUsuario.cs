using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Formulario;

[Migration(202507100920)]
public class ModificarUsuario(IOptions<DbSettings> dbSettings) : Migration
{
    private readonly string schema = dbSettings.Value.SchemaTables;
    private const string TableName = "Formulario";
    private const string ColumnName = "IdUsuario";

    public override void Up()
    {
        Alter.Column(ColumnName).OnTable(TableName).InSchema(schema).AsString().Nullable();
    }

    public override void Down()
    {
        Alter.Column(ColumnName).OnTable(TableName).InSchema(schema).AsGuid().Nullable();
    }
}
