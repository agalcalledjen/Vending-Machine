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
      },
      C1: {
        title: 'nerds',
        quantity: 3,
        price: 1.75
      },
      C2: {
        title: 'pop rocks',
        quantity: 1,
        price: 1.25
      },
      C3: {
        title: 'gob stoppers',
        quantity: 0,
        price: 2.75
      },
      D1: {
        title: 'apple crisps',
        quantity: 1,
        price: 2.95
      },
      D2: {
        title: 'kit-kat',
        quantity: 5,
        price: 1.85
      },
      D3: {
        title: 'kit-kat',
        quantity: 2,
        price: 1.15
      }
    };
  });

  describe('Purchase a product', () => {
    beforeEach(() => {
      // create an object called test.subject
      // test.subject is a new instance of VendingMachine
      // and since VendingMachine requires an input of data
      // we will pass in test.productInventory
      test.subject = new VendingMachine(test.productInventory);

      test.product = test.productInventory;
    });

    describe('when slot selection does not exist', () => {
      it('should throw an error', () => {
        expect(() => test.subject.querySlots('A4')).toThrow(
          'Invalid Product Selection'
        );
      });
    });

    describe('when slot selection does exist', () => {
      beforeEach(() => {
        test.slot = 'A1';
        test.result = test.subject.querySlots(test.slot);
      });

      it('should throw an error if invalid payment amount received', () => {
        expect(() => test.subject.querySlots('A1', 1)).toThrow(
          'Invalid Payment Amount'
        );
      });

      it('should throw an error if product is out of stock', () => {
        expect(() => test.subject.querySlots('B3', 3)).toThrow(
          'Product is out of stock.'
        );
      });

      // it('should return a product', () => {
      //   expect(test.result.title).toEqual(test.product[test.slot].title);
      // });
    });
  });
});
