using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarLogsFormulario
{
    public record LogFormularioResponse
    {

        public Guid Id { get; init; }
       
        public string Evento { get; init; }
        public string Usuario { get; init; }
        public string Estado { get; init; }
        public string VersionFormulario { get; init; }
        public DateTime Created { get; init; }

        public static LogFormularioResponse NewItem(Guid id, string evento, string usuario, string estado, string versionFormulario, DateTime created)
        {
            var item = new LogFormularioResponse
            {
                Id = id,
                Evento = evento,
                Usuario = usuario,
                Estado = estado,
                VersionFormulario = versionFormulario,
                Created = created
            };
            return item;
        }
    }
}
