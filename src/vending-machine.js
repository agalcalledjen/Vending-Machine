class VendingMachine {
  constructor(products, coins) {
    // these can be used anywhere within this class now
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

    // dispense product with change
    if (this.productInventory[slot].price < payment) {
      let product = this.productInventory[slot].title;
      let price = this.productInventory[slot].price;
      let quantity = this.productInventory[slot].quantity;
      --quantity;

      let totalChange = payment - price;

      // *100 to convert it
      let paymentChange = this.calCoinChange((payment - price) * 100);

      console.log(
        `Dispensed: ${product} | Change: $${totalChange} (${paymentChange}) | Quantity: ${quantity}`
      );

      return `Dispensed: ${product} | Change: $${totalChange} (${paymentChange}) | Quantity: ${quantity}`;
    }
  }

  queryProducts(title) {
    let restockProduct = 0;
    const productMax = 7;
    const inventory = Object.entries(this.productInventory);

    ////
    // console.log('TITLE---', title);

    inventory.map(product => {
      let productTitle = product[1].title;
      // console.log('PRODUCT TITLE---', productTitle);
      let productQuantity = product[1].quantity;
      // console.log('PRODUCT QUANTITY---', productQuantity);

      if (title !== productTitle) {
        throw 'Invalid Product';
      }

      if (title == productTitle && productQuantity == productMax) {
        // if (quantity == productQuantity) {
        throw 'Product does not need to be restocked.';
      }

      // if (title === productTitle && quantity < productMax) {
      if (productQuantity < productMax) {
        restockProduct = productMax - productQuantity;

        console.log(
          `Restocked: ${productTitle} | Restock Quantity: ${restockProduct}`
        );

        return `Restocked: ${productTitle} | Restock Quantity: ${restockProduct}`;
      }
    });

    //////////////
    // for (product in inventory) {
    // for (product in inventory) {
    //   console.log('TITLE---', title);
    //   console.log('INVENTORY---', inventory);

    //   console.log('PRODUCT________', product);
    //   const productname = product.title;
    //   console.log('-------------------', productname);

    //   const products = inventory[product];
    //   console.log('PRODUCTS---', products);

    //   const productTitle = products[1].title;
    //   console.log('PRODUCT TITLE---', productTitle);

    //   const productQuantity = products[1].quantity;
    //   console.log('PRODUCT QUANTITY---', productQuantity);

    //   if (title !== productTitle) {
    //     throw 'Invalid Product';
    //   }

    //   if (quantity === productMax) {
    //     // console.log(items[1].quantity);
    //     // console.log('itemTitle', productTitle);
    //     // console.log('title', title);
    //     throw 'Product does not need to be restocked.';
    //   }

    //   // product += product;
    // }
    ////////
  }

  queryCoins(title) {
    let refillCoin = 0;
    const coinMax = 25;
    const coinDrawer = Object.entries(this.coinDrawer);
    console.log('COIN DRAWER', this.coinDrawer);

    ////
    console.log('TITLE---', title);

    coinDrawer.map(coin => {
      let coinTitle = coin[1].title;
      // console.log('COIN TITLE---', coinTitle);
      let coinQuantity = coin[1].quantity;
      // console.log('COIN QUANTITY---', coinQuantity);

      // if (title !== coinTitle) {
      //   throw 'Invalid Product';
      // }

      if (title == coinTitle && coinQuantity == coinMax) {
        throw 'Coin does not need to be refilled.';
      }

      if (title == coinTitle && coinQuantity < coinMax) {
        refillCoin = coinMax - coinQuantity;

        console.log(`Refilled: ${coinTitle} | Refill Quantity: ${refillCoin}`);

        return `Refilled: ${coinTitle} | Refill Quantity: ${refillCoin}`;
      }
    });
  }
}

module.exports = VendingMachine;
