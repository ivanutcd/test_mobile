using utcd.cobro_prejuridico.Api.Plumbing.Config;
using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro;

DotNetEnv.Env.Load();
IConfiguration configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<CrearFormularioRegistroCommadHandler>();
builder.AddServer(configuration);
WebApplication? app = builder.Build();

await app.UseServer(args);
