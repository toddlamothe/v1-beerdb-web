# Beerdb - an app for beer lovers

I needed to learn how to develop an Angular that calls a C# RESTful API - quickly. This project demonstrates the component framework built into Angular 1.5+ by making use of [[BreweryDB](http://www.brewerydb.com/)](http://www.brewerydb.com/) - a free yet useful public API providing up to date information on your favorite beer and breweries. The service layer in a work in progress.

The services code is located in the beerdb-services repo.

## Download Source

To get you started you can simply clone the repo and install the dependencies:

### Clone beerdb

Clone the beerdb repository using [git][git]:

```
git clone https://github.com/toddlamothe/beerdb-web.git
```

## Configure Web Server

### Install Dependencies

```
git clone https://github.com/toddlamothe/beerdb.git
cd beerdb/web
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
beerdb changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

This project has been configured with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000`.

### Running Unit Tests

```
npm test
```

## Configure Services

### Build the Project

### Configure IIS

### Update Web Configuration Service
