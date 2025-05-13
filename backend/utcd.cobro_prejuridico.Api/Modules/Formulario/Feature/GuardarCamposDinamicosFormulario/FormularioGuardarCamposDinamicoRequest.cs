namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.GuardarComposDinamicosFormulario
{
    public class FormularioGuardarCamposDinamicoRequest
    {
        public Guid Id { get; set; }
        public Dictionary<string, object> EstructuraFormulario { get; set; }
    }
}
