#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/PMHelmutSchmidtPortal.Migrator/PMHelmutSchmidtPortal.Migrator.csproj", "src/PMHelmutSchmidtPortal.Migrator/"]
COPY ["src/PMHelmutSchmidtPortal.EntityFrameworkCore/PMHelmutSchmidtPortal.EntityFrameworkCore.csproj", "src/PMHelmutSchmidtPortal.EntityFrameworkCore/"]
COPY ["src/PMHelmutSchmidtPortal.Core/PMHelmutSchmidtPortal.Core.csproj", "src/PMHelmutSchmidtPortal.Core/"]
COPY ["src/PMHelmutSchmidtPortal.Core.Shared/PMHelmutSchmidtPortal.Core.Shared.csproj", "src/PMHelmutSchmidtPortal.Core.Shared/"]
RUN dotnet restore "src/PMHelmutSchmidtPortal.Migrator/PMHelmutSchmidtPortal.Migrator.csproj"
COPY . .
WORKDIR "/src/src/PMHelmutSchmidtPortal.Migrator"
RUN dotnet build "PMHelmutSchmidtPortal.Migrator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PMHelmutSchmidtPortal.Migrator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PMHelmutSchmidtPortal.Migrator.dll", "-s"]
