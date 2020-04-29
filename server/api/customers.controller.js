"use strict";
const fs = require('fs');
const customers = JSON.parse(fs.readFileSync('server/data/customers.json', 'utf-8'));
const states = JSON.parse(fs.readFileSync('server/data/states.json', 'utf-8'));

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

const statesRoute = app => {
  app.get('/api/states', (req, res) => {
    res.send(states);
  });
};

const addCustomerRoute = app => {
  app.post('/api/customers', (req, res) => {
    let postedCustomer = req.body;
    let maxId = Math.max.apply(Math, customers.map((cust) => cust.id));
    postedCustomer.id = ++maxId;
    postedCustomer.gender = (postedCustomer.id % 2 === 0) ? 'female' : 'male';
    customers.push(postedCustomer);
    res.json(postedCustomer);
  });
};

const updateCustomerRoute = app => {
  app.put('/api/customers/:id', (req, res) => {
    let putCustomer = req.body;
    let id = +req.params.id;
    let status = false;

    //Ensure state name is in sync with state abbreviation
    const filteredStates = states.filter((state) => state.abbreviation === putCustomer.state.abbreviation);
    if (filteredStates && filteredStates.length) {
      putCustomer.state.name = filteredStates[0].name;
      console.log('Updated putCustomer state to ' + putCustomer.state.name);
    }

    for (let i = 0, len = customers.length; i < len; i++) {
      if (customers[i].id === id) {
        customers[i] = putCustomer;
        status = true;
        break;
      }
    }
    res.json({status: status});
  });
}

module.exports.activateCustomersRoutes = function (app) {
  customersRoute(app);
  statesRoute(app);
  customerRoute(app);
  addCustomerRoute(app);
  updateCustomerRoute(app);
  dataInfoRoute(app);
};
