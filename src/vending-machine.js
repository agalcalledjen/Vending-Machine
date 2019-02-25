const coinDenominations = [
  { name: 'toonie', value: 200 },
  { name: 'loonie', value: 100 },
  { name: 'quarter', value: 25 },
  { name: 'dime', value: 10 },
  { name: 'nickel', value: 5 }
];

const coinCount = {};

const calCoinChange = remainingChange => {
  remainingChange = remainingChange;

  let indexOfCoin = 0;
  while (remainingChange > 0 && indexOfCoin < coinDenominations.length) {
    const coin = coinDenominations[indexOfCoin];
    const numberOfCoins = Math.floor(remainingChange / coin.value);
    coinCount[coin.name] = numberOfCoins;
    remainingChange -= numberOfCoins * coin.value;
    indexOfCoin++;
  }

  const change = Object.getOwnPropertyNames(coinCount)
    .map(coinName => `${coinName}: ${coinCount[coinName]}`)
    .join(`, `);

  return change;
};

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

    // dispense product with no change
    if (this.productInventory[slot].price === payment) {
      return `Dispensed: ${this.productInventory[slot].title}`;
    }

    if (this.productInventory[slot].price < payment) {
      let price = this.productInventory[slot].price;

      let totalChange = payment - price;

      // *100 to convert it
      let paymentChange = calCoinChange((payment - price) * 100);
      console.log(paymentChange);

      return `Dispensed: ${
        this.productInventory[slot].title
      } | Change: $${totalChange} (${paymentChange})`;
    }
  }
}

module.exports = VendingMachine;
