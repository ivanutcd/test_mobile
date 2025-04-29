using Enee.Core.Migrations.Utlis;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Factura;

[Migration(202402121415)]
public class FacturaConstraints(IOptions<DbSettings> dbSetting) : Migration
{
    public override void Up()
    {
        var schema = dbSetting.Value.SchemaTables;

        Create
            .WithPrimaryKey("DetalleFactura")
            .OnTable("DetalleFactura")
            .WithSchema(schema)
            .Column("Id");

        Create.WithForeignKey("DetalleFactura", 1)
            .FromTable("DetalleFactura")
            .InSchema(schema).
            ForeignColumn("FacturaId").
            ToTable("Factura")
            .InSchema(schema)
            .PrimaryColumn("Id");
    }

    public override void Down()
    {
        var schema = dbSetting.Value.SchemaTables;
        Delete.PrimaryKeyOnTable("Factura").FromTable("Factura").InSchema(schema);
        Delete.ForeignKey("DetalleFactura", 1).OnTable("DetalleFactura").InSchema(schema);
    }
}
