using utcd.cobro_prejuridico.Api.Plumbing.Config;

DotNetEnv.Env.Load();
IConfiguration configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);

builder.AddServer(configuration);
WebApplication? app = builder.Build();

await app.UseServer(args);
