using Enee.Core.Migrations.Utlis;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.CargaTrabajo
{
    [Migration(202506040900)]
    public class TablaCargaTrabajo(IOptions<DbSettings> dbSettings) : Migration
    {
        private readonly string schema = dbSettings.Value.SchemaTables;
        private const string TableName = "CargaTrabajo";

        public override void Up()
        {
            Create
                .Table(TableName)
                .InSchema(schema)
                .WithIdColumn()
                .NotNullable()
                .NotNullable()
                .WithColumn("IdUsuarioCarga")
                .AsGuid()
                .NotNullable()
                .WithColumn("FechaCarga")
                .AsDateTime()
                .NotNullable()
                .WithColumn("FechaAsignacion")
                .AsDateTime()
                .NotNullable()
                .WithColumn("Movilidad")
                .AsString(100)
                .NotNullable()
                .WithAuditableFields();
        }

        public override void Down()
        {
            Delete.Table(TableName).InSchema(schema);
        }
    }
}
