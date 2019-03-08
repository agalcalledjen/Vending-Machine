class VendingMachine {
  constructor(products, coins) {
    this.productInventory = products;
    this.coinDrawer = coins;
  }

  calCoinChange(remainingChange) {
    remainingChange = remainingChange;

    const coinDenominations = [
      { name: 'toonie', value: 200 },
      { name: 'loonie', value: 100 },
      { name: 'quarter', value: 25 },
      { name: 'dime', value: 10 },
      { name: 'nickel', value: 5 }
    ];

    const coinCount = {};
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
  }

  querySlots(slot, payment) {
    if (!slot || !this.productInventory[slot]) {
      throw 'Invalid Product Selection';
    }

    if (this.productInventory[slot].price > payment) {
      throw 'Invalid Payment Amount';
    }

    if (this.productInventory[slot].quantity === 0) {
      throw 'Product is out of stock.';
    }

    if (this.productInventory[slot].price === payment) {
      return `Dispensed: ${this.productInventory[slot].title}`;
    }

    if (this.productInventory[slot].price < payment) {
      let product = this.productInventory[slot].title;
      let price = this.productInventory[slot].price;
      let quantity = this.productInventory[slot].quantity;
      --quantity;
      let totalChange = payment - price;
      let paymentChange = this.calCoinChange((payment - price) * 100);

      return `Dispensed: ${product} | Change: $${totalChange} (${paymentChange}) | Quantity: ${quantity}`;
    }
  }

  queryProducts(title) {
    let restockProduct = 0;
    const productMax = 7;
    const inventory = Object.entries(this.productInventory);

    const filteredProduct = inventory.find(
      product => product[1].title === title
    );

    if (!filteredProduct) {
      throw 'Invalid Product';
    }

    const productTitle = filteredProduct[1].title;
    const productQuantity = filteredProduct[1].quantity;

    if (productQuantity == productMax) {
      throw 'Product does not need to be restocked.';
    }

    if (productQuantity < productMax) {
      restockProduct = productMax;
    }

    return `Restocked: ${productTitle} | Restock Quantity: ${restockProduct -
      productQuantity}`;
  }

  queryCoins(title) {
    let refillCoin = 0;
    const coinMax = 25;
    const coinDrawer = Object.entries(this.coinDrawer);
    const filteredCoin = coinDrawer.find(coin => coin[1].title === title);

    if (!filteredCoin) {
      throw 'Invalid Coin';
    }

    const coinTitle = filteredCoin[1].title;
    const coinQuantity = filteredCoin[1].quantity;

    if (coinQuantity == coinMax) {
      throw 'Coin does not need to be refilled.';
    }

    if (coinQuantity < coinMax) {
      refillCoin = coinMax;
    }

    return `Refilled: ${coinTitle} | Refill Quantity: ${refillCoin -
      coinQuantity}`;
  }
}

module.exports = VendingMachine;
