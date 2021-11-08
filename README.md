# Geo Tracker
## Live tracking app using Angular and Flask

During this project we have developed a web application that instantly records the locations of users to then plot the trajectory of each user on an interactive map. An administrator can then review the routes taken by users of the application.

The project has been devided into two parts :
- The frontend using Angular which can be found in the front Folder
- The backend using Flask which can be found in the server Folder

## Features

- Live tracking
- Instant location
- Save location on GPX Files
- Access to routes traveled by users (Admin dashboard)
- Trajectory tracing
- Works offline

## Technologies

Our project uses the following technologies : 

- [Angular](https://angular.io/)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Leaflet](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [Bootstrap](https://getbootstrap.com/)
- [PostgreSQL](https://www.postgresql.org/)


And of course Geo tracker itself is open source with a public repository on GitHub.
## Prerequisite
Before running the project you will need to install the following dependencies :
- [Node.js](https://nodejs.org/) 
- [Python](https://www.anaconda.com/)
- [PostgreSQL](https://www.postgresql.org/)

Before running the Angular project, run the following command on the frontend Folder :
```sh
npm install
```
This will install all the dependencies related to the frontend part of the project

## Database creation
Inside the Server Folder, there is a Databasedumps Folder where you can find the SQL requests leading to the tables creation.
Those requests will be used on PostgreSQL for Database creation.

## Installation

Reminder : Geo Tracker requires [Node.js](https://nodejs.org/) as well as [Python](https://www.anaconda.com/) to run .

Start the Flask part with the following commands using Windows :

```sh
set FLASK_APP=app
flask run
```
Start the Angular project with

```sh
ng serve
```
Check out the home page at http://localhost:4200
