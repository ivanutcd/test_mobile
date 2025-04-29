using System;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace utcd.cobro_prejuridico.Api.Plumbing.Config.Converters
{
    /// <summary>
    /// Converter for DateOnly that supports ISO 8601 formats and nullable DateOnly.
    /// </summary>
    public class DateOnlyNullableJsonConverter : JsonConverter<DateOnly?>
    {
        public override DateOnly? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType == JsonTokenType.Null)
            {
                return null; // Maneja valores nulos
            }

            if (reader.TokenType == JsonTokenType.String)
            {
                var rawDate = reader.GetString();

                // Intenta parsear la cadena en ISO 8601 usando DateTime
                if (DateTime.TryParse(rawDate, null, DateTimeStyles.RoundtripKind, out DateTime dateTime))
                {
                    return DateOnly.FromDateTime(dateTime); // Extrae solo la fecha
                }
            }

            throw new JsonException("Invalid ISO 8601 date format or null value.");
        }

        public override void Write(Utf8JsonWriter writer, DateOnly? value, JsonSerializerOptions options)
        {
            if (value.HasValue)
            {
                writer.WriteStringValue(value.Value.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture));
            }
            else
            {
                writer.WriteNullValue(); // Escribe null en el JSON
            }
        }
    }
}
