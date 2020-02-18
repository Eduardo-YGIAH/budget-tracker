const { getValue, setValue } = require('../config/helper_functions');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  name: {
    type: String,
    required: 'Description is required',
    trim: true,
    max: 300,
  },
  value: {
    type: Number,
    trim: true,
    min: [1, '0.01 is the minimum value you can enter.'],
    required: 'The expense value is required',
    max: [9999999999, 'That is a to big of a number'],
    get: getValue,
    set: setValue,
  },
});
ExpenseSchema.set('timestamps', true);

module.exports = mongoose.model('Expense', ExpenseSchema);
