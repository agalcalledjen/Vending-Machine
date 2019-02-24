const processData = require('./process-data');

class VendingMachine {
  constructor(data) {
    this.productInventory = productInventory;
    // these can be used anywhere within this class now
    this.coinDrawer = coinDrawer;
  }

  querySlots(slot) {
    return this.data[slot];
  }
}

module.exports = VendingMachine;
