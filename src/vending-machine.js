class VendingMachine {
  constructor(products, coins) {
    // these can be used anywhere within this class now
    this.productInventory = products;
    this.coinDrawer = coins;
  }

  querySlots(slot, payment) {
    if (!slot || !this.productInventory[slot]) {
      throw 'Invalid Product Selection';
    }

    // invalid payment amount received
    if (this.productInventory[slot].price > payment) {
      throw 'Invalid Payment Amount';
    }

    // product is out of stock
    if (this.productInventory[slot].quantity === 0) {
      throw 'Product is out of stock.';
    }

    // return this.productInventory[slot];
  }
}

module.exports = VendingMachine;
