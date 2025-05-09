namespace utcd.cobro_prejuridico.Api.Modules.Formulario.Feature.EditarFormulario
{
    public class FormularioEditarRequest
    {
        public Guid Id { get; set; }    
        public string NombreTecnico { get; set; }
        public string Descripcion { get; set; }
        public string MovilidadAsociada { get; set; }
        public string Estado { get; set; }
    }
}
