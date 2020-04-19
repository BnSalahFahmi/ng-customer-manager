"use strict";
const fs = require('fs');
const customers = JSON.parse(fs.readFileSync('server/data/customers.json', 'utf-8'));

const customersRoute = app => {
  app.get('/api/customers', (req, res) => {
    res.status(200);
    res.send(customers);
  });
};

const customerRoute = app => {
  app.get('/api/customers/:id', (req, res) => {
    res.status(200);
    res.send(customers.find(customer => customer.id == req.params.id));
  });
};

module.exports.activateCustomersRoutes = function (app) {
  customersRoute(app);
  customerRoute(app);
};
