using Enee.Core.Migrations.Utlis;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Factura;

[Migration(202402121414)]
public class TablaFactura(IOptions<DbSettings> dbSetting) : Migration
{
    public override void Up()
    {
        var schema = dbSetting.Value.SchemaTables;
        Create.Table("Factura")
            .InSchema(schema)
            .WithIdColumn()
            .NotNullable()
            .WithColumn("Numero")
            .AsString()
            .NotNullable()
            .WithColumn("FechaEmision")
            .AsDate()
            .NotNullable()
            .WithColumn("EstadoId")
            .AsString()
            .NotNullable()
            .WithAuditableFields();

        Create.Table("DetalleFactura")
            .InSchema(schema)
            .WithColumn("Id")
            .AsGuid()
            .NotNullable()
            .WithColumn("FacturaId")
            .AsGuid()
            .NotNullable()
            .WithColumn("Producto")
            .AsString()
            .NotNullable()
            .WithColumn("Cantidad")
            .AsInt32()
            .NotNullable()
            .WithColumn("Precio")
            .AsDecimal()
            .NotNullable()
            .WithAuditableFields();
    }

    public override void Down()
    {
        var schema = dbSetting.Value.SchemaTables;
        Delete.Table("Factura").InSchema(schema);
        Delete.Table("DetalleFactura").InSchema(schema);
    }
}
