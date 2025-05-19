using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Formulario
{
    [Migration(202505161041)]
    public class AgregarCamposDuplicadoFormulario(IOptions<DbSettings> dbSetting) : Migration
    {
        public override void Up()
        {
            var schema = dbSetting.Value.SchemaTables;

            Alter.Table("Formulario")
                .InSchema(schema)
                .AddColumn("FormularioOrigenId")
                .AsGuid()
                .Nullable();
        }

        public override void Down()
        {
            var schema = dbSetting.Value.SchemaTables;

            Delete.Column("FormularioOrigenId").FromTable("Formulario")
                .InSchema(schema);
        }
    }
}
