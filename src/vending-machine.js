const processData = require('./process-data');

class VendingMachine {
  constructor(data) {
    this.data = processData(data);
  }

  querySlots(slot) {
    return this.data[slot];
  }
}

module.exports = VendingMachine;
