FROM ghcr.io/proyectos-enee/dotnetcore/aspnet:<DOCKER_BACKEND_IMAGE_VERSION> AS base
COPY build/etc /etc

FROM ghcr.io/proyectos-enee/dotnetcore/sdk:<DOCKER_BACKEND_IMAGE_VERSION> AS build

FROM build AS publish
ARG GIT_ORGANIZATION
ENV GIT_ORGANIZATION=$GIT_ORGANIZATION
ARG NUGET_USERNAME
ENV NUGET_USERNAME=$NUGET_USERNAME
ARG NUGET_PASSWORD
ENV NUGET_PASSWORD=$NUGET_PASSWORD

ARG DB__CONEXION
ENV DB__CONEXION=$DB__CONEXION
ARG DB__SCHEMA_EVENTS
ENV DB__SCHEMA_EVENTS=$DB__SCHEMA_EVENTS
ARG DB__SCHEMA_DOCS
ENV DB__SCHEMA_DOCS=$DB__SCHEMA_DOCS
ARG DB__SCHEMA_TABLES
ENV DB__SCHEMA_TABLES=$DB__SCHEMA_TABLES

ARG AUTH__SERVER
ENV AUTH__SERVER=$AUTH__SERVER
ARG AUTH__CORS_ORIGINS
ENV AUTH__CORS_ORIGINS=$AUTH__CORS_ORIGINS
ARG AUTH__CLIENT_ID
ENV AUTH__CLIENT_ID=$AUTH__CLIENT_ID
ARG AUTH__CLIENT_SECRET
ENV AUTH__CLIENT_SECRET=$AUTH__CLIENT_SECRET
ARG AUTH__AUDIENCE
ENV AUTH__AUDIENCE=$AUTH__AUDIENCE

WORKDIR /app
RUN dotnet nuget add source https://nuget.pkg.github.com/${GIT_ORGANIZATION}/index.json --name enee --username ${NUGET_USERNAME} --password ${NUGET_PASSWORD} --store-password-in-clear-text

COPY ["utcd.cobro_prejuridico.Api/*.csproj", "utcd.cobro_prejuridico.Api/"]

COPY . .
WORKDIR "/app/utcd.cobro_prejuridico.Api"
RUN dotnet run -- codegen write
RUN dotnet publish "utcd.cobro_prejuridico.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

CMD ["dotnet", "utcd.cobro_prejuridico.Api.dll"]
ENTRYPOINT ["/init"]
