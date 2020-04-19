"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const config = require('./config/config');
const {activateCustomersRoutes} = require('./api/customers.controller');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log('Activating routes ...');
activateCustomersRoutes(app);
console.log('Routes activated successfully');

// Handle 404
app.use(function (req, res) {
//res.send(‘404: Page not Found’, 404);
  res.status(404).send({status: 404, message: '404 Not Found', type: 'client'});
});
// Handle 500
app.use(function (error, req, res, next) {
  res.status(500).send({status: 500, message: 'internal error', type: 'internal'});
});

console.log('Starting server ...');
return app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}.`);
});
