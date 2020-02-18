const { getValue, setValue } = require('../config/helper_functions');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DepositSchema = new Schema({
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
    required: 'The earning value is required',
    max: [9999999999, 'That is a to big of a number'],
    get: getValue,
    set: setValue,
  },
});
DepositSchema.set('timestamps', true);

module.exports = mongoose.model('Deposit', DepositSchema);
