const VendingMachine = require('../src/vending-machine');

describe('VendingMachine', () => {
  let test;

  beforeEach(() => {
    test = {};

    test.productInventory = {
      A1: {
        title: 'kit-kat',
        quantity: 3,
        price: 1.25
      },
      A2: {
        title: 'coffee crisp',
        quantity: 2,
        price: 1.75
      },
      A3: {
        title: 'twix',
        quantity: 5,
        price: 2.0
      },
      B1: {
        title: 'sour patch kids',
        quantity: 1,
        price: 1.5
      },
      B2: {
        title: 'gummy bears',
        quantity: 5,
        price: 1.75
      },
      B3: {
        title: 'sour keys',
        quantity: 0,
        price: 2.25
      }
      // C1: {
      //   title: 'nerds',
      //   quantity: 3,
      //   price: 1.75
      // },
      // C2: {
      //   title: 'pop rocks',
      //   quantity: 3,
      //   price: 1.75
      // },
      // C3: {
      //   title: 'gob stoppers',
      //   quantity: 3,
      //   price: 1.75
      // },
      // D1: {
      //   title: 'apple crisps',
      //   quantity: 3,
      //   price: 1.75
      // },
      // D2: {
      //   title: 'kit-kat',
      //   quantity: 3,
      //   price: 1.75
      // },
      // D3: {
      //   title: 'kit-kat',
      //   quantity: 3,
      //   price: 1.75
      // }
    };
  });

  describe('querySlots()', () => {
    beforeEach(() => {
      // create an object called test.subject
      // test.subject is a new instance of VendingMachine
      // and since VendingMachine requires an input of data
      // we will pass in test.productInventory
      test.subject = new VendingMachine(test.productInventory);
    });

    describe('when slot chosen does not exist', () => {
      it('should throw an error', () => {
        expect(() => test.subject.querySlots(A4)).toThrow(
          'Invalid Product Selection'
        );
      });
    });
  });
});
