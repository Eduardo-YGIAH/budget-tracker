//Helper function to generate Array of dates in range
exports.getValue = function(num) {
  return (num / 100).toFixed(2);
};

exports.setValue = function(num) {
  return num * 100;
};
