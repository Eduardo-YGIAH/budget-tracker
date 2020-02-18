const { getValue, setValue } = require('../config/helper_functions');

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  value: {
    type: Number,
    trim: true,
    default: 0,
    min: [0, 'That is to small of a number.'],
    max: [9999999999, 'That is to big of a number.'],
    get: getValue,
    set: setValue,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);
