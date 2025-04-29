// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

using MassTransit;

namespace utcd.cobro_prejuridico.Api.Plumbing.Core;

public static class BusExtensions
{

    public static IServiceCollection AddMassTransitConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        QueueSetting? queueSetting = configuration
            .GetRequiredSection(QueueSetting.ConfigurationSectionName)
            .Get<QueueSetting>();

        services.Configure<QueueSetting>(
            configuration.GetRequiredSection(QueueSetting.ConfigurationSectionName)
        );

        if (!queueSetting.Disabled)
        {
            services.AddMassTransit(busConfigurator =>
            {
                busConfigurator.SetKebabCaseEndpointNameFormatter();

                busConfigurator.AddConsumers(typeof(Program).Assembly);

                busConfigurator.UsingRabbitMq(
                    (context, cfg) =>
                    {
                        cfg.Host(
                            new Uri(queueSetting.Server),
                            hst =>
                            {
                                hst.Username(queueSetting.User);
                                hst.Password(queueSetting.Password);
                            }
                        );

                        cfg.UseInMemoryOutbox(context);

                        cfg.ConfigureEndpoints(context);
                    }
                );
            });
        }

        return services;
    }


}
