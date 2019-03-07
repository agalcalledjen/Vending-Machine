const VendingMachine = require('../src/vending-machine');
const dataProductInventory = require('./dataProductInventory.json');

describe('VendingMachine', () => {
  let test;

  beforeEach(() => {
    test = {};

    // test.productInventory = {
    //   A1: {
    //     title: 'Pixy Stix',
    //     quantity: 3,
    //     price: 1.25
    //   },
    //   A2: {
    //     title: 'Laffy Taffy',
    //     quantity: 2,
    //     price: 1.75
    //   },
    //   A3: {
    //     title: 'Sweetarts',
    //     quantity: 5,
    //     price: 2.05
    //   },
    //   B1: {
    //     title: 'Daim',
    //     quantity: 1,
    //     price: 1.5
    //   },
    //   B2: {
    //     title: 'Lion',
    //     quantity: 5,
    //     price: 1.75
    //   },
    //   B3: {
    //     title: 'Double Decker',
    //     quantity: 0,
    //     price: 2.25
    //   },
    //   C1: {
    //     title: 'Nerds',
    //     quantity: 3,
    //     price: 1.75
    //   },
    //   C2: {
    //     title: 'Pop Rocks',
    //     quantity: 1,
    //     price: 1.25
    //   },
    //   C3: {
    //     title: 'Gob Stoppers',
    //     quantity: 0,
    //     price: 2.75
    //   },
    //   D1: {
    //     title: 'Jackfruit Chips',
    //     quantity: 1,
    //     price: 2.95
    //   },
    //   D2: {
    //     title: 'Veggie Stix',
    //     quantity: 5,
    //     price: 1.85
    //   },
    //   D3: {
    //     title: 'Harvest Snaps',
    //     quantity: 2,
    //     price: 1.15
    //   }
    // };
  });

  describe('Purchase a product', () => {
    beforeEach(() => {
      // create an object called test.subject
      // test.subject is a new instance of VendingMachine
      // and since VendingMachine requires an input of data
      // we will pass in test.productInventory
      // test.subject = new VendingMachine(test.productInventory);
      test.subject = new VendingMachine(dataProductInventory);

      // test.product = test.productInventory;
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
        test.slot = 'B1';
        // test.payment = 1.5;
        // test.result = test.subject.querySlots(test.slot, test.payment);
        result = test.subject;
      });

      it('should throw an error if invalid payment amount received', () => {
        expect(() => test.subject.querySlots('B1', 1)).toThrow(
          'Invalid Payment Amount'
        );
      });

      it('should throw an error if product is out of stock', () => {
        expect(() => test.subject.querySlots('B3', 3)).toThrow(
          'Product is out of stock.'
        );
      });

      it('should return a product with no change', () => {
        expect(result.querySlots('B1', 1.5)).toEqual(
          // test.subject[test.slot].title
          'Dispensed: Daim'
        );
      });

      it('should return a product with change', () => {
        expect(result.querySlots('B1', 2.5)).toEqual(
          // test.subject[test.slot].title
          'Dispensed: Daim | Change: $1 (toonie: 0, loonie: 1)'
        );
      });
    });
  });
});
