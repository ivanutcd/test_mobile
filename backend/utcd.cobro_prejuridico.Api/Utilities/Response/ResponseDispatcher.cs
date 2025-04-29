using Enee.Core.Common.Util;
using Enee.Core.CQRS.Validation;

namespace utcd.cobro_prejuridico.Api.Utilities.Response;

public static class ResponseDispatcher
{
    public static IResult ToResponse(this Either<OK, List<MessageValidation>> result,object? value=null)
    {
        return result.Match<IResult>(
            ok =>  value==null? Results.Ok() : Results.Ok(value),
            error => Results.BadRequest(error)
        );
    }


}
