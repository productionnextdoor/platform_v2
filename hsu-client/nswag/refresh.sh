#!/bin/sh
currentPath=$(pwd)
option=$1

start_docker()
{
	echo ""
	echo "######################################"
	echo "Starting backend docker-container"
	echo "######################################"
	cd $currentPath
	cd ../../backend
	docker-compose up -d
	sleep 10s #linux user
	#sleep 10 #mac user
	# check if docker is running
	res=$(echo $?)
	echo ""
	if [ "$res" = "0" ]; then
		echo "Backend Docker is Running."
	else
		echo "Error: Could not start the backend docker!"
		exit 1
	fi
}

stop_docker()
{
	echo ""
	echo "######################################"
	echo "Stopping backend docker-container"
	echo "######################################"
	cd $currentPath
	cd ../../backend/
	docker-compose down >/dev/null 2>&1
	#check if docker is stopped
	sleep 5s #linux user
	#sleep 5 #mac user
	res=$(echo $?)
	echo ""
	if [ "$res" = "0" ]; then
		echo "Backend Docker has been stopped."
	else
		echo "Warning: Could not stop the backend docker!"
	fi
}

start_web()
{
	echo ""
	echo "######################################"
	echo "Starting the backend-project"
	echo "######################################"
	cd ../PMHelmutSchmidtPortal.Web.Host
	nohup dotnet run >/dev/null 2>&1 &
	# wait
	sleep 45s
	#sleep 45 #mac user
	#check connection to db
	lsof -i -P -n | grep -e "PMHelmutS.*1433 (ESTABLISHED)" >/dev/null 2>&1 #linux user
	#lsof -i -P -n | grep -e "com.docke.*:1433 (LISTEN)" >/dev/null 2>&1 #mac user
	res=$(echo $?)
	echo ""
	if [ "$res" = "0" ]; then
		echo "Connection to database is established."
	else
		echo "Error: Could not establish a connection to database!"
		exit 1
	fi
	#check connection to swagger
	lsof -i -P -n | grep -e "PMHelmutS.*44301 (LISTEN)" >/dev/null 2>&1 #linux user
	#lsof -i -P -n | grep -e "PMHelmutS.*:44301 (LISTEN)" >/dev/null 2>&1 #mac user
	res=$(echo $?)
	echo ""
	if [ "$res" = "0" ]; then
		echo "Connection to swagger is established."
	else
		echo "Error: Could not establish a connection to swagger!"
		exit 1
	fi
}

stop_web()
{
	echo ""
	echo "######################################"
	echo "Stopping the backend-project"
	echo "######################################"
	kill $(ps aux | grep 'bin/Debug/net7.0/PMHelmutSchmidtPortal.Web.Host' | awk '{print $2}') >/dev/null 2>&1
	sleep 10s #linux user
	#sleep 10 #mac user
	#check connection to swagger
	lsof -i -P -n | grep -e "PMHelmutSchmidtPortal.*44301 (LISTEN)" >/dev/null 2>&1 #linux user
	#lsof -i -P -n | grep -e "PMHelmutS.*:44301 (LISTEN)" >/dev/null 2>&1 #mac user
	res=$(echo $?)
	echo ""
	if [ "$res" = "1" ]; then
		echo "Swagger is stopped."
	else
		echo "Warning: Could not stop the swagger!"
	fi
}

update_database()
{
	echo ""
	echo "######################################"
	echo "Updating the database"
	echo "######################################"
	cd $currentPath
	cd ../../backend/src/PMHelmutSchmidtPortal.EntityFrameworkCore
	dotnet ef database update
}

generate_swagger()
{
	echo ""
	echo "######################################"
	echo "Generating swagger"
	echo "######################################"
	cd $currentPath
	../node_modules/.bin/nswag run
}

if [ "$option" = "-help" ]; then
	echo "This script will start the backend-docker and run the project, updates the database and auto generate the swag, on default it will keep the backend-docker and project runnig."
	echo "You can stop the backend-docker and project by running it with -stop as option."
	echo "-help 	prints this help"
	echo "-update 	Only pdates the database and the swag and at the end will stop the backend-cocker and project running"
	echo "-stop	stops the web and the docker at the end"
else
	stop_web
	stop_docker

	if [ "$option" != "-stop" ]; then
		#start and build
		start_docker
		update_database
		start_web
		generate_swagger
		# stop if needed
		if [ "$option" = "-update" ]; then
			stop_web
			stop_docker
		fi
	fi
fi
