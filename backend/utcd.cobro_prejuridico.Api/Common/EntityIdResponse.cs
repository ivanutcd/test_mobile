namespace utcd.cobro_prejuridico.Api.Common
{
    public class EntityIdResponse
    {
        public EntityIdResponse() { }

        public EntityIdResponse(Guid id)
        {
            Id = id;
        }

        public Guid Id { get; set; }
    }
}
