using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Formulario
{
    [Migration(202505120901)]
    public class AgregarCampoEstructuraFormulario(IOptions<DbSettings> dbSetting) : Migration
    {
        public override void Up()
        {
            var schema = dbSetting.Value.SchemaTables;

            Alter.Table("Formulario")
                .InSchema(schema)
                .AddColumn("EstructuraFormulario")
                .AsCustom("jsonb") 
                .Nullable(); 
        }

        public override void Down()
        {
            var schema = dbSetting.Value.SchemaTables;

            Delete.Column("EstructuraFormulario")
                .FromTable("Formulario")
                .InSchema(schema);
        }
    }
}
