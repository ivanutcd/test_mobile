using Carter;
using Enee.IoC.Architecture.Extensions;
using Oakton;

namespace utcd.cobro_prejuridico.Api.Plumbing.Config;

public static class ConfigureApplication
{
    public static async Task<int> UseServer(
        this WebApplication app,
        string[] args,
        string? optionsFile = null
    )
    {
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        else
        {
            app.UseHttpsRedirection();
        }

        //Manejo de excepciones
        app.UseExceptionHandler();

        //Transaccionalidad
        app.UseMiddleware<UnitOfWorkMiddleware>();

        // Usa la autenticación y autorización
        app.UseCors("default");
        app.UseAuthentication();
        app.UseAuthorization();

        // app.MapControllers(); // Comentado por Minimal API
        app.MapCarter(); // <-- Minimal API


        return await app.RunOaktonCommands(args);
    }
}
