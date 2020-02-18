const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');
const path = require('path');
const Expense = require('./models/expense');
const Deposit = require('./models/deposit');

const PORT = 3010;

const app = express();

app.use(logger('dev'));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname + '/dist')));

mongoose.connect('mongodb://localhost/budget', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// routes here
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/data', async (req, res) => {
  try {
    const expenses = await Expense.find({});
    const deposits = await Deposit.find({});
    if (!expenses && !deposits) {
      res.status(404).send();
    } else {
      res.status(302).send({
        expenses,
        deposits,
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/api/expense', async function(req, res) {
  const expense = new Expense({
    ...req.body,
  });
  try {
    await expense.save();
    res.send(expense);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/api/deposit', async function(req, res) {
  const deposit = new Deposit({
    ...req.body,
  });
  try {
    await deposit.save();
    res.send(deposit);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.delete('/api/expense', async function(req, res) {
  try {
    await Expense.deleteMany({});
    res.send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/api/deposit', async function(req, res) {
  try {
    await Deposit.deleteMany({});
    res.send(req.body);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
