# HSU Platform

## Voraussetzungen

Bevor du mit dem Setup beginnst, installiere folgende Tools:

| Tool | Version | Download |
|------|---------|----------|
| Docker Desktop | inkl. docker compose v2 | [docker.com](https://www.docker.com/products/docker-desktop/) |
| .NET SDK | 10.0 | [dotnet.microsoft.com](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) |
| Node.js | 18 LTS | [nodejs.org](https://nodejs.org/) (oder per [nvm](https://github.com/nvm-sh/nvm)) |
| JetBrains Rider | aktuell | [jetbrains.com](https://www.jetbrains.com/rider/) (Backend-IDE) |
| WebStorm | aktuell | [jetbrains.com](https://www.jetbrains.com/webstorm/) (Frontend-IDE) |
| DBeaver | aktuell | Optional, fuer DB-Verwaltung: `sudo snap install dbeaver-ce` |

> **Tipp:** Wenn du Node.js per [nvm](https://github.com/nvm-sh/nvm) installierst, kannst du einfach zwischen Versionen wechseln:
> ```bash
> nvm install 18
> nvm use 18
> ```

---

## 1. Datenbank starten

Die Datenbank ist ein MSSQL-Server, der per Docker bereitgestellt wird.

1. Navigiere in den `backend/`-Ordner
2. Starte den Datenbank-Container:

```bash
docker compose up -d
```

3. Warte ca. 10 Sekunden, bis der Server bereit ist

> **Erwartetes Ergebnis:** Der Container `local_db` laeuft. Du kannst das mit `docker ps` pruefen.

### Datenbank-Verbindung (optional)

Falls du die Datenbank mit DBeaver oder einem anderen Tool inspizieren moechtest:

| Einstellung | Wert |
|-------------|------|
| Host | `localhost` |
| Port | `1433` |
| Authentifizierung | SQL Server Authentication |
| Benutzer | `sa` |
| Passwort | siehe `backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json` |
| Trust Server Certificate | Ja |

### Wichtige Dateien

- Docker Compose: `backend/docker-compose.yml`
- Connection String: `backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json`

---

## 2. Backend einrichten

### .NET SDK installieren (Linux)

1. Lade das Installationsskript herunter und fuehre es aus:

```bash
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
chmod +x ./dotnet-install.sh
./dotnet-install.sh --channel 10.0
```

2. Setze die Umgebungsvariablen systemweit. Fuege folgende Zeilen am Ende deiner `~/.profile`-Datei hinzu:

```bash
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$PATH:$HOME/.dotnet:$HOME/.dotnet/tools
```

3. Lade die Aenderungen neu (oder starte das Terminal neu):

```bash
source ~/.profile
```

4. Pruefe die Installation:

```bash
dotnet --version
```

> **Erwartetes Ergebnis:** Die Ausgabe zeigt eine 10.0.x Version.

### Dev-Zertifikat einrichten

Damit HTTPS lokal funktioniert, muss ein Entwicklungszertifikat erstellt werden.

**macOS:**

```bash
dotnet dev-certs https --trust
```

**Linux:**

```bash
dotnet dev-certs https -ep ~/Documents/hsu-cert.crt -np --trust --format Pem
sudo cp ~/Documents/hsu-cert.crt /usr/local/share/ca-certificates
sudo update-ca-certificates
```

### Entity Framework Tools installieren

Die EF-Tools werden benoetigt, um die Datenbank-Migrationen auszufuehren:

```bash
dotnet tool install --global dotnet-ef
```

### Datenbank-Migrationen ausfuehren

Dieser Schritt erstellt die Datenbank `PMHelmutSchmidtPortalDb` mit allen Tabellen:

```bash
cd backend/src/PMHelmutSchmidtPortal.EntityFrameworkCore
dotnet ef database update
```

> **Erwartetes Ergebnis:** Die Migration laeuft ohne Fehler durch. In DBeaver (oder einem anderen DB-Tool) sollte die Datenbank `PMHelmutSchmidtPortalDb` sichtbar sein.

### Backend starten

1. Oeffne die Solution `backend/PMHelmutSchmidtPortal.Web.sln` in Rider
2. Waehle die Run-Configuration `PMHelmutSchmidtPortal.Web.Host`
3. Starte das Projekt

> **Erwartetes Ergebnis:** In der Konsole erscheint `Now listening on: https://localhost:44301`. Oeffne diese URL im Browser — die Swagger-API-Dokumentation sollte sichtbar sein.

### Wichtige Dateien

- Konfiguration: `backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json`
- Launch-Settings: `backend/src/PMHelmutSchmidtPortal.Web.Host/Properties/launchSettings.json`

---

## 3. Frontend einrichten

Das Frontend besteht aus zwei Paketen:

- **hsu-library** — wiederverwendbare UI-Komponenten (Angular Library)
- **hsu-client** — die eigentliche Anwendung (Angular Application)

### Library bauen

> **Hinweis:** Dieser Schritt ist nur noetig, wenn du den Storybook-Docker-Container **nicht** verwendest. Der Container baut die Library automatisch (siehe Abschnitt Storybook).

```bash
cd hsu-library/projects/hsu-library
npm i && ng build && rm -rf ./node_modules
```

### Client starten

```bash
cd hsu-client
npm i
npm run start
```

> **Erwartetes Ergebnis:** Die Anwendung kompiliert und ist unter `http://localhost:4200` erreichbar.

### Library-Aenderungen im Client uebernehmen

Wenn du Komponenten in der hsu-library aenderst und diese im Client testen willst:

**Schnellweg:** Fuehre im `hsu-client`-Ordner aus:

```bash
npm run restart
```

**Manueller Weg:**

1. Loesche den Cache: `rm -rf ./hsu-client/.angular/cache`
2. Baue die Library neu: `cd hsu-library/projects/hsu-library && npm i && ng build && rm -rf ./node_modules`
3. Starte den Client neu: `cd hsu-client && npm i && npm run start`

### Wichtige Dateien

- Client-Konfiguration: `hsu-client/package.json`
- Library-Konfiguration: `hsu-library/projects/hsu-library/package.json`

---

## 4. Storybook (optional)

Storybook ist eine UI-Entwicklungsumgebung fuer die hsu-library-Komponenten. Alle Komponenten befinden sich in `hsu-library/projects/hsu-library/src/lib`, die zugehoerigen Stories in `hsu-library/projects/hsu-library/src/stories`.

### Einmalig: Container-Image bauen

```bash
cd hsu-library
docker compose build --no-cache
```

### Storybook starten

```bash
cd hsu-library
docker compose up
```

> **Erwartetes Ergebnis:** Storybook ist unter `http://localhost:6006` erreichbar. Aenderungen an Komponenten werden automatisch uebernommen (Hot Reload).

### Wichtige Dateien

- Docker Compose: `hsu-library/docker-compose.yml`
- Library-Pakete: `hsu-library/package.json`

---

## 5. Planner (optional)

Der Planner ist ein separates Tool von HITeC und wird in einem eigenen Repository verwaltet.

1. Klone das Planner-Repository: https://github.com/pmagentur/hsu-planner
2. Starte den Planner im geklonten Repository:

```bash
docker compose up
```

3. Ermittle die Docker-Bridge-IP:

```bash
ifconfig | grep -A 1 docker0
```

Kopiere die IP-Adresse nach `inet`.

4. Trage die IP an zwei Stellen ein:
   - `backend/src/PMHelmutSchmidtPortal.Web.Host/Properties/launchSettings.json` → Ersetze die `applicationUrl`
   - `backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json` → Ersetze die `PlannerRootAddress`

5. Falls der Planner mit HTACCESS-Authentifizierung gesichert ist, trage die Zugangsdaten in `appsettings.json` unter `Authentication > Planner` ein:

```json
"Planner": {
  "UserName": "dein-benutzername",
  "Password": "dein-passwort"
}
```

---

## 6. Shop-Anbindung (Shopware)

> **Hinweis:** Die Shopware-Installation selbst ist nicht Teil dieses Repositories. Dieser Abschnitt beschreibt nur die Anbindung eines bestehenden Shops an die Platform.

### API-Verbindung konfigurieren

Damit die Platform Produkte in den Shop exportieren und Bestellungen importieren kann, wird ein API-Zugang benoetigt.

1. Oeffne die Shopware-Administration
2. Navigiere zu **Verkaufskanaele → hsu-shop → API-Zugang**
3. Kopiere den **API-Zugangschluessel**
4. Trage ihn in `backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json` unter `Authentication > Shopware > ClientSecret` ein:

```json
"Shopware": {
  "GrantType": "password",
  "UserName": "admin",
  "Password": "shopware",
  "ClientId": "administration",
  "ClientSecret": "DEIN-API-SCHLUESSEL"
}
```

> **Wichtig:** Wenn du die Shop-Admin-Zugangsdaten aenderst, muessen `UserName` und `Password` hier ebenfalls aktualisiert werden.

---

## Zugangsdaten

### Platform-Benutzer

| Benutzer | Rolle | Passwort |
|----------|-------|----------|
| `PM_PortalAdmin` | Admin (alle Rechte) | `Pl34s3_Ch4ng3!` |
| `admin` | API-Benutzer (Platform ↔ Shop) | `Pl34s3_Ch4ng3!` |

### Datenbank

Die Zugangsdaten fuer den lokalen Datenbankserver stehen im Connection String in `backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json`.

> **Wichtig:** Aendere die Standard-Passwoerter in Produktionsumgebungen.

---

## Empfohlene Versionen

| Tool | Version |
|------|---------|
| .NET SDK | 10.0 |
| Entity Framework Core | 10.0.0 |
| Angular | 17.3.12 |
| Angular CLI | ~17.3.17 |
| Node.js | 18 |
| TypeScript | ~5.4.5 |
| Storybook | 7.3.2 |
