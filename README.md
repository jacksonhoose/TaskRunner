# Jackson's Task Runner

A template for running important frontend tasks and testing with Karma/Mocha/Chai

## Setup
* Run `npm install -g gulp`
* Run `npm install`
* Run `gulp` to run your specs
* You may need to install karma and mocha globally with `npm install -g karma mocha`

## Karma
* Autowatch files with Karma by running `karma start`
* There is a files array that specifies which folders/specs to include when launching Phantom. Make sure you include your scripts before your tests.

## Gulp
* Auto watch all your files (the default task) by running `gulp`
* Run specific tasks by running `gulp [task-name]` ie. `gulp test` which will run your testing suite once.