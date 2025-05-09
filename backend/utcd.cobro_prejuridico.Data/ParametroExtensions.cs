using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using Enee.Core.Migrations.Utlis.Catalogs;
using Newtonsoft.Json;

namespace utcd.cobro_prejuridico.Data
{
    internal class ParametroModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("nombre")]
        public string Nombre { get; set; }

        [JsonProperty("fechaCreacion")]
        public DateTime FechaCreacion { get; set; }
    }

    internal class ParametrosService
    {
        private readonly HttpClient client;

        private HttpClientHandler ValidationCallback() =>
            new()
            {
                ServerCertificateCustomValidationCallback = (
                    HttpRequestMessage message,
                    X509Certificate2? cert,
                    X509Chain? chain,
                    SslPolicyErrors errors
                ) => true
            };

        public ParametrosService()
        {
            client = new HttpClient(ValidationCallback());
        }

        public ParametrosService(string baseUrl)
        {
            client = new HttpClient(ValidationCallback());
            client.BaseAddress = new Uri(baseUrl);
        }

        public ParametrosService(string baseUrl, Dictionary<string, string> headers)
        {
            client = new HttpClient(ValidationCallback());
            client.BaseAddress = new Uri(baseUrl);
            foreach (KeyValuePair<string, string> header in headers)
            {
                client.DefaultRequestHeaders.Add(header.Key, header.Value);
            }
        }

        public Task<List<ParametroModel>> GetCatalogo(string code)
        {
            var url = $"/parametros/api/v1/catalogos/no-paginados?id={code}";
            return Get<List<ParametroModel>>(url);
        }

        private async Task<T> Get<T>(string url)
            where T : class
        {
            HttpResponseMessage response = await client.GetAsync(url);
            T result = null;
            if (response.IsSuccessStatusCode)
            {
                var stringResponse = await response.Content.ReadAsStringAsync();
                result = Newtonsoft.Json.JsonConvert.DeserializeObject<T>(stringResponse);
            }
            else
            {
                if (response.StatusCode != System.Net.HttpStatusCode.NotFound)
                {
                    response.EnsureSuccessStatusCode();
                }
            }
            return result;
        }
    }

    public static class ParametroExtensions
    {
        public static bool Exist(this Catalog catalog)
        {
            var baseUrl = Environment.GetEnvironmentVariable("SERVER__PARAMETROS");
            var apiKey = Environment.GetEnvironmentVariable("SERVER__PARAMETROS_APIKEY");

            var client = new ParametrosService(baseUrl, new() { { "X-API-KEY", apiKey } });

            List<ParametroModel> catalogo = client.GetCatalogo(catalog.Id).GetAwaiter().GetResult();

            var exist = catalogo.Count > 0;

            Console.ForegroundColor = ConsoleColor.Yellow;
            if (catalogo.Count > 0)
            {
                Console.WriteLine("Catálogo " + catalog.Id + " ya esta registrado.");
            }
            Console.WriteLine();
            Console.ResetColor();

            return exist;
        }
    }
}
