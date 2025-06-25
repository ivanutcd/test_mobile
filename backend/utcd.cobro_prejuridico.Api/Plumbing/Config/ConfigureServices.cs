using System.Reflection;
using System.Text.Json.Serialization;
using Autofac;
using Carter;
using utcd.cobro_prejuridico.Api.Plumbing.Config.Converters;
using utcd.cobro_prejuridico.Api.Plumbing.Core;
using Enee.Core.Data.EFCore;
using utcd.cobro_prejuridico.Data;
using Enee.IoC.Architecture;
using Enee.IoC.Architecture.Auth;
using Enee.IoC.Architecture.Auth.Models;
using Enee.IoC.Architecture.Extensions;
using Enee.IoC.Architecture.Others;
using Marten;
using Oakton;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Projections.FormularioTable;
using UtcdRefacturacion.Infraestructure.Modules.Common;
using Enee.Core.CQRS.Query;
using Enee.Core.Infraestructure.TrackingEvent.GetEventLog;
using Enee.IoC.Autofac;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario;
using TestApp.Domain.LogDeEventos.Projectors;

namespace utcd.cobro_prejuridico.Api.Plumbing.Config;

public static class ConfigureServices
{
    public static IServiceCollection AddServer(
        this WebApplicationBuilder builder,
        IConfiguration configuration
    )
    {
        builder.Configuration.AddConfiguration(configuration);

        Assembly? domainAssembly = typeof(Formulario).Assembly;

        DbSettings? dbSettings = configuration
            .GetRequiredSection(DbSettings.ConfigurationSectionName)
            .Get<DbSettings>();

        builder.Host.ApplyOaktonExtensions();

        builder.Services.Configure<AuthSettings>(
            configuration.GetRequiredSection(AuthSettings.ConfigurationSectionName)
        );

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder
            .Services.AddEndpointsApiExplorer()
            .AddCarter() // <-- Minimal API
            .ConfigureHttpJsonOptions(opt => //System.Text.Json
            {
                opt.SerializerOptions.Converters.Add(new DateOnlyJsonConverter());
                opt.SerializerOptions.Converters.Add(new DateOnlyNullableJsonConverter());
                opt.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
                opt.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            })
            .AddSwaggerGen()
            .AddSingleton<IConfigureMarten, UserMartenConfig>()
            .AddScoped<IObjectMapper, MapsterObjectMapper>()
            .AddDefaultCors(configuration);

        SetupArchitecture? setup = builder.SetupArchitecture(
            dbSettings!,
            domainAssembly,
            (containerBuilder) =>
            {
                containerBuilder
                    .RegisterType<DiscoverEfConfigurations>()
                    .As<IModelBuildingStrategy>();
                //registro de mapeo de excepciones
                containerBuilder.RegisterType<DefaultDomainExceptionMap>().As<IMapException>();
            }
        );

        builder.Services.AddMassTransitConfiguration(configuration);


        // Agrega esta línea para registrar HttpClient
        builder.Services.AddHttpClient();
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddMemoryCache();

        builder.AddSSO(configuration);
        //builder.Services.AddSecurityOpen(authSettings);


        //Registro de Manejador de excepciones
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
        builder.Services.AddProblemDetails();

        if (builder.Environment.IsDevelopment())
        {
            setup.ApplyAllDatabaseChangesOnStartup();
        }

        return builder.Services;
    }
}
