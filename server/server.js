"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const corsOptions = {origin: "http://localhost:3001"};
const app = express();
const config = require('./config/config');
const {activateCustomersRoutes} = require('./api/customers.controller');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log('Activating routes ...');
activateCustomersRoutes(app);
console.log('Routes activated successfully');

console.log('Starting server ...');
return app.listen(config.server.port, () => {
  console.log(`Server is running on port ${config.server.port}.`);
});
