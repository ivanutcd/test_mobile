using Enee.Core.Migrations.Utlis.Security;
using FluentMigrator;

namespace utcd.cobro_prejuridico.Data.Seeders
{
    [Profile("permisos")]
    public class CrearPermisosFormulario : Migration
    {
        public override void Up()
        {
            Config
                .System(Constants.System)
                .Module("formulario", "Formularios Dinamico")
                .Access(
                    Access.Code("crear_formulario").Name("Crear Formulario"),
                    Access.Code("editar_formulario").Name("Editar Formulario"),
                    Access.Code("eliminar_formulario").Name("Eliminar Formulario"),
                    Access.Code("publicar_formulario").Name("Publicar Formulario")
                )
                .Save();
        }

        public override void Down() { }
    }
}
