"use strict";
const fs = require('fs');
const customers = JSON.parse(fs.readFileSync('server/data/customers.json', 'utf-8'));

const customersRoute = app => {
  app.get('/api/customers', (req, res) => {
    res.status(200);
    res.send(
      customers
    );
  });
};

const customerRoute = app => {
  app.get('/api/customers/:id', (req, res) => {
    res.status(200);
    res.send(customers.find(customer => customer.id == req.params.id));
  });
};

const dataInfoRoute = app => {
  app.get('/api/dataInfos', (req, res) => {
    res.status(200);
    res.send([{
      customersCount: customers.length,
      ordersCount: customers.reduce((total, x) => (x.orders ? total + x.orders.length : total), 0)
    }]);
  });
};

module.exports.activateCustomersRoutes = function (app) {
  customersRoute(app);
  customerRoute(app);
  dataInfoRoute(app);
};
