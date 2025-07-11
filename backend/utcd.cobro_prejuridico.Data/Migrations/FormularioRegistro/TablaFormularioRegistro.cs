using Enee.Core.Migrations.Utlis;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.FormularioRegistro
{
    [Migration(202506020130)]
    public class TablaFormularioRegistro(IOptions<DbSettings> dbSetting) : Migration
    {
        private readonly string TableName = "FormularioRegistro";

        public override void Up()
        {
            var schema = dbSetting.Value.SchemaTables;
            Create
                .Table(TableName)
                .InSchema(schema)
                .WithIdColumn()
                .NotNullable()
                .WithColumn("FormularioId")
                .AsGuid()
                .NotNullable()
                .WithColumn("ClientFormId")
                .AsString(200)
                .NotNullable()
                .WithColumn("IdUsuario")
                .AsGuid()
                .NotNullable()
                .WithColumn("FechaInicio")
                .AsDateTime()
                .NotNullable()
                .WithColumn("VersionFormulario")
                .AsString()
                .NotNullable()
                .WithColumn("Data")
                .AsString(int.MaxValue)
                .NotNullable()
                .WithAuditableFields();

            Create
                .ForeignKey($"FK_{TableName}_Formulario")
                .FromTable(TableName)
                .InSchema(schema)
                .ForeignColumn("FormularioId")
                .ToTable("Formulario")
                .InSchema(schema)
                .PrimaryColumn("Id");
        }

        public override void Down()
        {
            var schema = dbSetting.Value.SchemaTables;
            Delete.Table("FormularioRegistro").InSchema(schema);
        }
    }
}
