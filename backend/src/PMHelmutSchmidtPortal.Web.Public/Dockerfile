#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/PMHelmutSchmidtPortal.Web.Public/PMHelmutSchmidtPortal.Web.Public.csproj", "src/PMHelmutSchmidtPortal.Web.Public/"]
COPY ["src/PMHelmutSchmidtPortal.Web.Core/PMHelmutSchmidtPortal.Web.Core.csproj", "src/PMHelmutSchmidtPortal.Web.Core/"]
COPY ["src/PMHelmutSchmidtPortal.Application/PMHelmutSchmidtPortal.Application.csproj", "src/PMHelmutSchmidtPortal.Application/"]
COPY ["src/PMHelmutSchmidtPortal.Application.Shared/PMHelmutSchmidtPortal.Application.Shared.csproj", "src/PMHelmutSchmidtPortal.Application.Shared/"]
COPY ["src/PMHelmutSchmidtPortal.Core.Shared/PMHelmutSchmidtPortal.Core.Shared.csproj", "src/PMHelmutSchmidtPortal.Core.Shared/"]
COPY ["src/PMHelmutSchmidtPortal.Core/PMHelmutSchmidtPortal.Core.csproj", "src/PMHelmutSchmidtPortal.Core/"]
COPY ["src/PMHelmutSchmidtPortal.EntityFrameworkCore/PMHelmutSchmidtPortal.EntityFrameworkCore.csproj", "src/PMHelmutSchmidtPortal.EntityFrameworkCore/"]
COPY ["src/PMHelmutSchmidtPortal.GraphQL/PMHelmutSchmidtPortal.GraphQL.csproj", "src/PMHelmutSchmidtPortal.GraphQL/"]
RUN dotnet restore "src/PMHelmutSchmidtPortal.Web.Public/PMHelmutSchmidtPortal.Web.Public.csproj"
COPY . .
WORKDIR "/src/src/PMHelmutSchmidtPortal.Web.Public"
RUN dotnet build "PMHelmutSchmidtPortal.Web.Public.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PMHelmutSchmidtPortal.Web.Public.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PMHelmutSchmidtPortal.Web.Public.dll"]
