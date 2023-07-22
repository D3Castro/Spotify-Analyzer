# Spotify Analyzer

This is a Flask React project that utilizes Spotify's web API to extract user info and display it.
Once a user has logged in displayed are two lists with their top artists and tracks. The data used is controlled by a dropdown for the following time ranges: `Past 4 Weeks`, `Past 6 Months`, `All Time`.
A radar chart is also displayed representing the audio features of the top tracks from any of the time ranges.
To prevent many API requests to the web API caching is implemented using flask.

## Run the app

Create a .env file in the root directory with your spotify client id and secret
```
CLIENT_ID=VALUE
CLIENT_SECRET=VALUE
```
Install node modules from inside the `front-end/` directory
> `$ npm i -f`

Instantiate the app via docker
> `$ docker-compose up`

Initialize the flask database 
> `$ docker exec -it api_local /bin/bash`

> `$ python3 -m flask init-db`

Open browser and go to `https://localhost:3000`
