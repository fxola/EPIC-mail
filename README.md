[![Build Status](https://travis-ci.org/fxola/EPIC-mail.svg?branch=develop)](https://travis-ci.org/fxola/EPIC-mail) [![Maintainability](https://api.codeclimate.com/v1/badges/4a65e80443dd980aab5f/maintainability)](https://codeclimate.com/github/fxola/EPIC-mail/maintainability) [![Coverage Status](https://coveralls.io/repos/github/fxola/EPIC-mail/badge.svg)](https://coveralls.io/github/fxola/EPIC-mail) 

# EPIC-mail
A web app that helps people exchange messages/information over the internet

## Pivotal Tracker
Project is currently being built with the Project Management Tool, Pivotal Tracker. You can find the template at https://www.pivotaltracker.com/n/projects/2314937

## Template Link
Template is hosted at https://fxola.github.io/EPIC-mail/UI/index.html


### API Deployment

API is deployed at https://epicmail-api.herokuapp.com


## Built With


<ul>
<li><a href="https://nodejs.org/">NodeJS</a></li>
<li><a href="https://expressjs.com/">ExpressJS</a></li>
<li><a href="https://developer.mozilla.org/kab/docs/Web/HTML">HTML</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</a></li>
<li><a href="https://developer.mozilla.org/bm/docs/Web/JavaScript">JavaScript</a></li>
</ul>


## Getting Started

### Installation

* Clone this repository using `git clone https://github.com/fxola/EPIC-mail.git .`
* Use the `.env.example` file to setup your environmental variables and rename the file to `.env`
* Run `npm install` to install all dependencies
* Run `npm start` to start the server

### Supporting Packages

#### Linter

* [ESLint](https://eslint.org/) - Linter Tool

#### Compiler

* [Babel](https://eslint.org/) - Compiler for Next Generation JavaScript


#### Test Tools

* [Mocha](https://mochajs.org/) - JavaScript Test Framework for API Tests (Backend)
* [Chai](http://chaijs.com/) - TDD/BDD Assertion Library for Node
* [Chai-http](https://github.com/visionmedia/supertest) - A Chai plugin for testing node.js HTTP servers
* [Istanbul(nyc)](https://istanbul.js.org/) - Code Coverage Generator





### Testing
<ul><li>Run Test</li></ul>
<pre><code>npm run test</code></pre>
<br>
<ul><li>Run Coverage Report</li></ul>
<pre><code>npm run coverage</code></pre>
<br>

### API Routes

|        DESCRIPTION        |  HTTP METHOD | ROUTES                   |
|:-------------------------:|--------------|--------------------------|
| Sign up User              |  POST        |  /api/v1/auth/signup     |
| Log in User               |  POST        |  /api/v1/auth/login      |
| Send a message            | POST         | /api/v1/messages         |
| Get all received messages |  GET         |  /api/v1/messages        |
| Get sent messages         | GET          | /api/v1/messages/sent    |
| Get all unread messages   |  GET         |  /api/v1/messages/unread |
| Get single message        |  GET         |  /api/v1/messages/{id}   |
| Retract a message         |  DELETE      | /api/v1/messages/{id}    |

## License

&copy; Afolabi Abass Ajanaku

Licensed under the [MIT License](https://github.com/fxola/EPIC-mail/blob/develop/LICENSE)

