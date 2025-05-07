using Enee.Core.Migrations.Utlis.Catalogs;
using FluentMigrator;

namespace utcd.cobro_prejuridico.Data.Migrations.Formulario;

[Migration(202505060820)]
public class CatalogosFormulario : Migration
{
    private readonly List<Catalog> CatalogList  = new List<Catalog>
    {
        Catalog.Code("tipo_movilidad").Name("Tipo movilidad"),
        Catalog.Code("estado_formulario").Name("Estado formulario"),
    };

    public override void Up()
    {
        foreach (Catalog? catalogo in CatalogList)
        {
            Config.Catalogs(catalogo).Create();
        }
    }

    public override void Down() { }
}
