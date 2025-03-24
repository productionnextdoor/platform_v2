# HSU Platform

# HSU Platform

## Setup

### Backend
1. Install Rider using JetBrains-Toolbox
2. Install [Mono](https://www.mono-project.com/) by executing:
	`sudo apt install gnupg ca-certificates` 
	`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF` 
	`echo "deb https://download.mono-project.com/repo/ubuntu stable-focal main" | sudo tee /etc/apt/sources.list.d/mono-official-stable.list` 
	`sudo apt update` 
	`sudo apt install mono-devel` 
3. Install [.Net SDK](https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu) by executing:
	`wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh` 
	`sudo chmod +x ./dotnet-install.sh` 
	`./dotnet-install.sh --version latest` 
	`./dotnet-install.sh --version latest --runtime aspnetcore` 
	`./dotnet-install.sh --channel 7.0` 
4. Set [.Net environment variables](https://learn.microsoft.com/en-us/dotnet/core/install/linux-scripted-manual#set-environment-variables-system-wide) system-wide
	Add following lines to the end of your .profile-file (using vim or nano):
	`export DOTNET_ROOT=$HOME/.dotnet` 
	`export PATH=$PATH:$HOME/.dotnet:$HOME/.dotnet/tools` 
5. Open Web solution (`hsu-platform/backend/PMHelmutSchmidtPortal.Web.sln`) in IDE and select `PMHelmutSchmidtPortal.Web.Host` as run configuration
6. Run `docker-compose up` in `hsu-platform/backend` to start DB
7. Install DBeaver by executing:
	`sudo snap install dbeaver-ce`
8. Open DBeaver and connect to DB (localhost:1433, choose SQL Server)
	Host: `localhost` 
	Port: `1433`
	Database/Schema: leave it empty
	Authentication: `SQL Server Authentication` 
	see credentials in `hsu-platform/backend/src/PMHelmutSchmidtPortal.Web.Host/appsettings.json` 
	Under Settings check `Trust Server Certificate` 
9. Install EF Tool by executing:
	`dotnet tool install --global dotnet-ef` 
10. Apply migrations in your local DB: Run `~/.dotnet/tools/dotnet-ef database update` in `hsu-platform/backend/src/PMHelmutSchmidtPortal.EntityFrameworkCore`
11. Create new database `PMHelmutSchmidtPortalDb` (from now on, use this database when connecting to DB with your MSSQL-Browser)
12. Run project in IDE (PMHelmutSchmidtPortal.Web.Host), Console should log `Now listening on: https://localhost:44301`. Go to https://localhost:44301 and verify if Swagger login is visible

### Planner
1. Planner repo: https://github.com/pmagentur/hsu-planner
2. Run `docker-compose up` to start the planner
3. Run `ifconfig | grep -A 1 docker0` in the terminal and copy the ip after `inet`
4. Copy the ip to the `src/PMHelmutSchmidtPortal.Web.Host/Properties/launchSettings.json` instead of the one in `applicationUrl`
5. Copy the ip to the `src/PMHelmutSchmidtPortal.Web.Host/appsettings.json` instead of the one in `ServerRootAddress`

### Storybook
1. (_once during setup_) Building the storybook container image using `docker-compose build --no-cache` in `hsu-library`
2. Run `docker-compose up` in `hsu-library` to start storybook.

The docker container also automatically builds the library and watches for changes.

### Frontend
1. Install Web Storm
2. open `hsu-client` and run `npm i`
3. open `hsu-client` and run `npm run start`

### Running the Default ASP Zero Client.
1. Restore the packages by running `yarn`
2. Run the following command to create dynamic bundles (This is only required for the first time when you download the project or when you update dynamic bundles) `npm run create-dynamic-bundles`
3. Start the client: Execute the command `npm start` to start the client application.
4. Once the application compiled, you can browse http://localhost:4200 in your browser.

### Build Frontend Library

> Note: Building the library is only required if you dont use the storybook docker container. The storybook docker
> container automatically builds the library and watches for changes.

1. open `hsu-library/projects/hsu-library` and run `npm i && ng build && rm -rf ./node_modules`
2. remove `hsu-library/.angular/cache`
3. restart client

### Build Frontend
1. open `hsu-library` and run `ng build --localize`


### Changing Storybook Component Style and Rendering it in the Client Working Process
1. If you rendered a component in the client and need to change it's style from storybook, go inside `./hsu-client/.angular` and delete the cache folder
2. Go inside `./hsu-client` and delete node_modules (Optional)
3. Go to `./hsu-library/projects/hsu-library/` then run `npm i && ng build && rm -rf ./node_modules`
4. Go back inside `./hsu-client` and run `npm i` then `npm run start`
- Or you can just run `npm run restart` inside hsu-client it will do steps number 1,2,4 for you.

### Adding dev certificate to openssl (Commands can be executed from anywhere)
1. `dotnet dev-certs https --trust` if you are working on Mac-OS this is the only step that you need to do.
2. `dotnet dev-certs https -ep ~/Documents/hsu-cert.crt -np --trust --format Pem`
3. `sudo cp ~/Documents/hsu-cert.crt /usr/local/share/ca-certificates`
4. `sudo update-ca-certificates` 

<!-- ### Client Swagger Command (Starts Docker/Start Backend/Update Database/Generate Swagger)
1. Make sure you already do the instruction insection 'Adding dev certificate to openssl'
2. Open Docker (Without docker compose up)[For Mac Only!][At the beginning of the day]
3. In `hsu-platform/hsu-client/nswag` run `./refresh.sh`
4. At the end of the day please stop the process `./refresh.sh -stop` -->

## Recommend Versions
   
Angular CLI: 16.2.0

Node: 16.20.2

Package Manager: npm 8.19.4

OS: linux x64

Angular: 

Package                      Version

------------------------------------------------------

@angular-devkit/architect    0.1303.6 (cli-only)

@angular-devkit/core         13.3.6 (cli-only)

@angular-devkit/schematics   13.3.6 (cli-only)

@schematics/angular          13.3.6 (cli-only)

