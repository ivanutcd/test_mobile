using JasperFx.CodeGeneration;
using JasperFx.CodeGeneration.Commands;
using JasperFx.CodeGeneration.Model;
using JasperFx.RuntimeCompiler;
using Oakton;

namespace utcd.cobro_prejuridico.Api.Tools.Migrations;

[Description("Marten Setup", Name = "marten-setup")]
public class MartenSetupCommand:OaktonAsyncCommand<GenerateCodeInput>
{
    public MartenSetupCommand()
    {
        Usage("action").NoArguments();
        Usage("action").Arguments(x => x.Action);
    }
    public  override Task<bool> Execute(GenerateCodeInput input)
    {
        using (IHost host = input.BuildHost())
        {
            ConsoleColor defaultColor = Console.ForegroundColor;
            IServiceProvider? services = host.Services;
            ICodeFileCollection[] array = host.Services.GetServices<ICodeFileCollection>()
                .ToArray<ICodeFileCollection>();
            if (!((IEnumerable<ICodeFileCollection>) array).Any<ICodeFileCollection>())
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.Write("[red]No registered ICodeFileCollection services were detected, aborting.[/]");
                return Task.FromResult(false);
            }
            var dynamicCodeBuilder = new DynamicCodeBuilder(services, array)
            {
                ServiceVariableSource = services.GetService<IServiceVariableSource>()
            };
            Console.WriteLine("Deleting Generated code");
            dynamicCodeBuilder.DeleteAllGeneratedCode();
            Console.WriteLine("Writing code");
            dynamicCodeBuilder.WriteGeneratedCode((Action<string>) (file => Console.WriteLine("Wrote generated code file to " + file)));
            Console.WriteLine("Run Test..");
            Console.WriteLine("Trying to generate all code and compile, this might take a bit.");
            dynamicCodeBuilder.TryBuildAndCompileAll((Action<GeneratedAssembly, IServiceVariableSource>) ((a, s) => new AssemblyGenerator().Compile(a, s)));
            Console.ForegroundColor= ConsoleColor.Green;
            Console.Write("SUCCESS!");
            Console.ForegroundColor=defaultColor;
            return Task.FromResult(true);
        }
    }
}
