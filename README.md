# README.md

## About the 'Mijn Uitgaven' app
It's a demo app which can show someone's monthly expenses ('Mijn Uitgaven' = 'My Expenses'). It's made with Ionic 2,rc4 and the Ionic CLI.

The expenses can manually be ordered by category, which gives a nice monthly overview. There are 18 categories. Category names can be changed.

## Data
This demo app uses demo data.

##  Database
On mobile devices the app used data stored in an SQLite database. In a web browser it populates a Dexie database (= Indexed DB).

## Database uses callbacks
Contrary to what Ionic's documentation says, the database.executeSql function in database.transaction doesn't return a promise. Instead it uses callback functions.

## D3 used for detached dom elements
The charts are made with D3.js. D3 is used to create dummy DOM-elements whose attributes are used as input for creating dom elements in the Angular components. This is described in [Working with D3.js and Canvas: When and How](https://bocoup.com/weblog/d3js-and-canvas).

## Start in the browser for development
`ionic serve`

## Deploying
See the Ionic page [Deploying to a device](http://ionicframework.com/docs/v2/setup/deploying/).
