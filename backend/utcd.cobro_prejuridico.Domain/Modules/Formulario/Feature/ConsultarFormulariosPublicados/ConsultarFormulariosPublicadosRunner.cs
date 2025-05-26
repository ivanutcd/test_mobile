using System.Security.Cryptography;
using System.Text;
using Ardalis.Specification;
using Enee.Core.CQRS.Query;
using Enee.Core.Domain;
using Enee.Core.Domain.Repository;
using Enee.Core.Domain.Specs;
using utcd.cobro_prejuridico.Domain.Common;
using utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormularios;

namespace utcd.cobro_prejuridico.Domain.Modules.Formulario.Feature.ConsultarFormulariosPublicados;

public class ConsultarFormulariosPublicadosRunner : IQueryRunner<ConsultarFormulariosPublicadosQuery, IPaginated<FormulariosPublicadosResponse>>
{
public IReadOnlyRepository<Projections.FormularioTable.Formulario> Repository { get; }
public IObjectMapper Mapper { get; }

public ConsultarFormulariosPublicadosRunner(IReadOnlyRepository<Projections.FormularioTable.Formulario> repository,
    IObjectMapper mapper)
{
    Repository = repository;
    Mapper = mapper;
}

public async Task<IPaginated<FormulariosPublicadosResponse>> Run(ConsultarFormulariosPublicadosQuery query)
{
    var spec = new SpecificationGeneric<Projections.FormularioTable.Formulario>();
    spec.Query.Where(x =>
        x.IdUsuario == query.Request.IdUsuario &&
        x.Estado == "publicado");


    IPaginated<Projections.FormularioTable.Formulario> paginatedFormulario =
        await Repository.Paginate(query.Request.Page, query.Request.PageSize, spec);

    IPaginated<FormulariosPublicadosResponse>? response =
        Mapper.Map<IPaginated<FormulariosPublicadosResponse>>(paginatedFormulario);
    foreach (FormulariosPublicadosResponse? item in response.Data)
    {
        var hashInput = $"{item.Id}|{item.NombreTecnico}|{item.VersionFormulario}|{item.EstructuraFormulario}|{item.UpdatedDate:o}";
        item.HashUsuario = CalcularSHA256(hashInput);
    }

    return response;
}
private string CalcularSHA256(string input)
{
    using var sha256 = SHA256.Create();
    var bytes = Encoding.UTF8.GetBytes(input);
    var hash = sha256.ComputeHash(bytes);
    return BitConverter.ToString(hash).Replace("-", "").ToLower();
}
}
