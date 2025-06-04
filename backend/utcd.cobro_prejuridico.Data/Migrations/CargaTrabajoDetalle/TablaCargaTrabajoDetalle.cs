using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.Core.Migrations.Utlis;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.CargaTrabajoDetalle
{
    [Migration(202506040930)]
    public class TablaCargaTrabajoDetalle(IOptions<DbSettings> dbSettings) : Migration
    {
        private readonly string schema = dbSettings.Value.SchemaTables;
        private const string TableName = "CargaTrabajoDetalle";

        public override void Up()
        {
            Create.Table(TableName)
                .InSchema(schema).WithIdColumn().NotNullable()
                .WithColumn("IdUsuario").AsGuid().NotNullable()
                .WithColumn("FechaAsignacion").AsDateTime().NotNullable()
                .WithColumn("Movilidad").AsString(100).NotNullable()
                .WithColumn("Clave").AsString(100).NotNullable()
                .WithColumn("Detalle").AsString(int.MaxValue).NotNullable()
                .WithColumn("EstadoCaptura").AsString(50).NotNullable().WithDefaultValue("pendiente")
                .WithColumn("EstadoSincronizacion").AsString(50).NotNullable().WithDefaultValue("pendiente")
                .WithColumn("ClientFormId").AsString(200).Nullable()
                .WithColumn("CargaTrabajoId").AsGuid().NotNullable()
                .WithAuditableFields();

            Create.ForeignKey($"FK_{TableName}_CargaTrabajo")
                .FromTable(TableName).InSchema(schema).ForeignColumn("CargaTrabajoId")
                .ToTable("CargaTrabajo").InSchema(schema).PrimaryColumn("CargaTrabajoId");
        }

        public override void Down()
        {
            Delete.Table(TableName).InSchema(schema);
        }
    }
}
