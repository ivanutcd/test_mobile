using System.Globalization;
using utcd.cobro_prejuridico.Data;
using Enee.IoC.Architecture;
using Oakton;
using static System.Int32;

namespace utcd.cobro_prejuridico.Api.Tools.Migrations;

public class RunMigrationDown
{
    public class MigrationDown
    {
        //[FlagAlias("s")]
        [Description("Optional Cantidad de migraciones a dar rollback desde la ultima migración", Name = "steps")]
        public string? Steps { get; set; }
    }

    [Description("Migration Down", Name = "migration-down")]
    public class MigrationDownCommand : OaktonAsyncCommand<MigrationDown>
    {
        public MigrationDownCommand()
        {
            Usage("steps").NoArguments();
            Usage("steps").Arguments(x=>x.Steps);

        }

        public override Task<bool> Execute(MigrationDown input)
        {
            Console.WriteLine("ALERT");

            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            DbSettings? dbSettings = configuration.GetRequiredSection(DbSettings.ConfigurationSectionName)
                .Get<DbSettings>();
            MigrationStartup.MigrationDown(
                postgresConexion:dbSettings!.PostgresConexion!,
                defaultSchema:dbSettings.SchemaTables!,
                steps: string.IsNullOrWhiteSpace(input.Steps) ?1: Parse(input.Steps, CultureInfo.InvariantCulture)  ,
                typeof(DiscoverEfConfigurations).Assembly);
            return Task.FromResult(true);
        }
    }
}
