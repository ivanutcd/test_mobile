namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Common
{
    public class FormularioEstado
    {
        public FormularioEstado(string value)
        {
            Value = value;
        }

        public string Value { get; }

        public static FormularioEstado Borrador
        {
            get => new FormularioEstado("borrador");
        }
        public static FormularioEstado Publicado
        {
            get => new FormularioEstado("publicado");
        }
        public static FormularioEstado Obsoleto
        {
            get => new FormularioEstado("obsoleto");
        }

    }
}
