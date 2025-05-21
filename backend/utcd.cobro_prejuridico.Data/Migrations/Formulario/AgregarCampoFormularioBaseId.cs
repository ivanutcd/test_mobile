using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Enee.IoC.Architecture;
using FluentMigrator;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;

namespace utcd.cobro_prejuridico.Data.Migrations.Formulario
{
    [Migration(202505201000)]
    public class AgregarCampoFormularioBaseId(IOptions<DbSettings> dbSetting) : Migration
    {
        public override void Up()
        {
            var schema = dbSetting.Value.SchemaTables;

            Delete.Column("FormularioOrigenId")
                   .FromTable("Formulario")
                   .InSchema(schema);

            Alter.Table("Formulario")
                .InSchema(schema)
                .AddColumn("FormularioBaseId")
            .AsGuid()
                .Nullable();

            Create.ForeignKey("FK_Formulario_FormularioBaseId")
                .FromTable("Formulario").InSchema(schema).ForeignColumn("FormularioBaseId")
                .ToTable("Formulario").InSchema(schema).PrimaryColumn("Id");
        }

        public override void Down()
        {
            var schema = dbSetting.Value.SchemaTables;

            Delete.ForeignKey("FK_Formulario_FormularioBaseId")
                .OnTable("Formulario").InSchema(schema);

            Delete.Column("FormularioBaseId")
                .FromTable("Formulario").InSchema(schema);

            Alter.Table("Formulario")
              .InSchema(schema)
              .AddColumn("FormularioOrigenId")
              .AsGuid()
              .Nullable();
        }
    }
}
