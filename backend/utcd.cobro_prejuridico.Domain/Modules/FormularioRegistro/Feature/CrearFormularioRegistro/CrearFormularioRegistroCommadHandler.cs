using System.Text.Json;
using Enee.Core.Domain.Repository;
using NetTopologySuite.Index.HPRtree;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Common;
using utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.AggregateRoot;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace utcd.cobro_prejuridico.Domain.Modules.FormularioRegistro.Feature.CrearFormularioRegistro
{
    public class CrearFormularioRegistroCommadHandler
    {
        private readonly IWritableEventStoreRepository<FormularioRegistroRoot> Store;
        public IReadOnlyRepository<Formulario.Projections.FormularioTable.Formulario> Repository { get; }
        public IReadOnlyRepository<Projections.FormularioRegistroTable.FormularioRegistro> FormularioRegistroRepository { get; }
        public CrearFormularioRegistroCommadHandler(IWritableEventStoreRepository<FormularioRegistroRoot> store, IReadOnlyRepository<Formulario.Projections.FormularioTable.Formulario> repository, IReadOnlyRepository<Projections.FormularioRegistroTable.FormularioRegistro> formularioRegistroRepository)
        {
            Store = store;
            Repository = repository;
            FormularioRegistroRepository = formularioRegistroRepository;
        }

        public async Task<List<FormularioRegistroResponse>> Handle(CrearFormularioRegistroCommad command)
        {
            var respuestas = new List<FormularioRegistroResponse>();

            foreach (DatosFormularioDto item in command.listaFormularioDatos)
            {
                var mensajes = new List<MensajeDetalle>();
                var respuesta = new FormularioRegistroResponse
                {
                    ClientFormId = item.ClientFormId,
                    FormId = item.FormId,
                    VersionFormulario = item.VersionFormulario
                };
                 (var esValido, List<MensajeDetalle> errores) = ValidarFormulario(item.FormId,item.Datos, item.ClientFormId);

                if (!esValido)
                {
                    respuesta.Estado = EstadoRespuesta.Error;
                    respuesta.Respuesta = errores;
                    respuestas.Add(respuesta);
                    continue;
                }
                try
                {
                    var id = Guid.NewGuid();
                    //DateTime fecha = DateTime.Now;
                    item.FechaInicio = DateTime.SpecifyKind(item.FechaInicio, DateTimeKind.Unspecified);
                    var model = new FormularioRegistroRoot(
                       id,
                       item.ClientFormId,
                       item.IdUsuario,
                       item.FechaInicio,
                       item.VersionFormulario,
                       item.Datos,
                       item.FormId

                    );


                    await Store.Create(model);

                    respuesta.Estado = EstadoRespuesta.Exito;
                    mensajes.Add(new MensajeDetalle
                    {
                        Codigo = CodigosRespuesta.RegistroExitoso.codigo,
                        Mensaje = CodigosRespuesta.RegistroExitoso.mensaje
                    });


                }
                catch (Exception ex)
                {
                    respuesta.Estado = EstadoRespuesta.Error;
                    mensajes.Add(new MensajeDetalle
                    {
                        Codigo = CodigosRespuesta.ErrorInterno.codigo,
                        Mensaje = CodigosRespuesta.ErrorInterno.mensaje + ex.Message
                    });
                }
                respuesta.Respuesta = mensajes;
                respuestas.Add(respuesta);
            }

            return respuestas;
        }
        private (bool esValido, List<MensajeDetalle> errores) ValidarFormulario(Guid formId,string datosJson, string clientFormId)
        {
            var errores = new List<MensajeDetalle>();
            Formulario.Projections.FormularioTable.Formulario formulario = Repository.AsQueryable().FirstOrDefault(x => x.Id == formId);

            if (formulario == null)
            {
                errores.Add(new MensajeDetalle
                {
                    Codigo = CodigosRespuesta.FormularioNoEncontrado.codigo,
                    Mensaje = CodigosRespuesta.FormularioNoEncontrado.mensaje
                });
            }

            if (formulario.Estado != FormularioEstado.Publicado.Value)
            {
                errores.Add(new MensajeDetalle
                {
                    Codigo = CodigosRespuesta.FormularioNoPublicado.codigo,
                    Mensaje = CodigosRespuesta.FormularioNoPublicado.mensaje
                });
            }
            var yaExisteClienteForm = FormularioRegistroRepository
            .AsQueryable().Any(x => x.ClientFormId == clientFormId);
            if (yaExisteClienteForm)
            {
                errores.Add(new MensajeDetalle
                {
                    Codigo = CodigosRespuesta.FormularioYaRegistrado.codigo,
                    Mensaje = CodigosRespuesta.FormularioYaRegistrado.mensaje
                });
            }
            JsonElement estructuraFormularioJson = JsonSerializer.Deserialize<JsonElement>(formulario.EstructuraFormulario);
            JsonElement datos = JsonSerializer.Deserialize<JsonElement>(datosJson);
            foreach (JsonElement campo in estructuraFormularioJson.EnumerateArray())
            {
                var label = campo.GetProperty("label").GetString()?.ToLower();
                var requerido = campo.GetProperty("required").GetBoolean();
                var tipo = campo.GetProperty("type").GetString()?.ToLower();

                if (string.IsNullOrWhiteSpace(label))
                    continue;

                if (!datos.TryGetProperty(label, out JsonElement valor))
                {
                    if (requerido)
                    {
                        errores.Add(new MensajeDetalle { Codigo = CodigosRespuesta.DatosIncompletos.codigo, Mensaje = CodigosRespuesta.DatosIncompletos.mensaje });
                    }
                    continue;
                }

                var error = false;

                switch (tipo)
                {
                    case "text":
                    case "string":
                        if (valor.ValueKind != JsonValueKind.String || (requerido && string.IsNullOrWhiteSpace(valor.GetString())))
                            error = true;
                        break;

                    case "number":
                    case "int":
                    case "integer":
                        if (valor.ValueKind != JsonValueKind.Number || !valor.TryGetInt32(out var num))
                        {
                            error = true;
                            break;
                        }
                        if (campo.TryGetProperty("min", out JsonElement min) && num < min.GetInt32())
                            error = true;
                        if (campo.TryGetProperty("max", out JsonElement max) && num > max.GetInt32())
                            error = true;
                        if (campo.TryGetProperty("step", out JsonElement step) && (num - (campo.TryGetProperty("min", out JsonElement minStep) ? minStep.GetInt32() : 0)) % step.GetInt32() != 0)
                            error = true;
                        break;

                    case "decimal":
                    case "float":
                    case "double":
                        if (valor.ValueKind != JsonValueKind.Number || !valor.TryGetDecimal(out var dec))
                        {
                            error = true;
                            break;
                        }
                        if (campo.TryGetProperty("min", out JsonElement minD) && dec < minD.GetDecimal())
                            error = true;
                        if (campo.TryGetProperty("max", out JsonElement maxD) && dec > maxD.GetDecimal())
                            error = true;
                        break;

                    case "bool":
                    case "boolean":
                        if (valor.ValueKind != JsonValueKind.True && valor.ValueKind != JsonValueKind.False)
                            error = true;
                        break;

                    case "date":
                    case "datetime":
                        if (valor.ValueKind != JsonValueKind.String || !DateTime.TryParse(valor.GetString(), out DateTime fecha))
                        {
                            error = true;
                            break;
                        }
                        if (campo.TryGetProperty("minDate", out JsonElement minDate) && DateTime.TryParse(minDate.GetString(), out DateTime minDt) && fecha < minDt)
                            error = true;
                        if (campo.TryGetProperty("maxDate", out JsonElement maxDate) && DateTime.TryParse(maxDate.GetString(), out DateTime maxDt) && fecha > maxDt)
                            error = true;
                        break;

                    default:
                        if (campo.TryGetProperty("options", out JsonElement opciones) && opciones.ValueKind == JsonValueKind.Array)
                        {
                            var encontrado = opciones.EnumerateArray().Any(opt => opt.GetString()?.ToLower() == valor.GetString()?.ToLower());
                            if (!encontrado)
                                error = true;
                        }
                        else
                        {
                            error = true;
                        }
                        break;
                }

                if (error)
                {
                    errores.Add(new MensajeDetalle
                    {
                        Codigo = CodigosRespuesta.DatosIncompletos.codigo,
                        Mensaje = CodigosRespuesta.DatosIncompletos.mensaje
                    });
                }
            }
            return (errores.Count == 0, errores);
        }
    }
}


