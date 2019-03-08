const VendingMachine = require('../src/vending-machine');
const dataProductInventory = require('./dataProductInventory.json');

describe('VendingMachine', () => {
  let test;

  beforeEach(() => {
    test = {};
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

      describe('when product is not in stock', () => {
        it('should throw an error', () => {
          // expect(() => test.subject.querySlots('B3', 3)).toThrow(
          expect(() => result.querySlots('B3', 3)).toThrow(
            'Product is out of stock.'
          );
        });
      });

      describe('when product is in stock', () => {
        describe('when payment is invalid', () => {
          // TODO: show remaining balance?
          it('should throw an error', () => {
            // expect(() => test.subject.querySlots('B1', 1)).toThrow(
            expect(() => result.querySlots(test.slot, 1)).toThrow(
              'Invalid Payment Amount'
            );
          });
        });

        describe('when payment is valid', () => {
          it('should return a product with no change for exact payment', () => {
            expect(result.querySlots(test.slot, 1.5)).toEqual(
              // test.subject[test.slot].title
              'Dispensed: Daim'
            );
          });

          it('should return a product with change', () => {
            expect(result.querySlots(test.slot, 2.5)).toEqual(
              // test.subject[test.slot].title
              'Dispensed: Daim | Change: $1 (toonie: 0, loonie: 1) | Quantity: 0'
            );
          });

          it('should decrease quantity of product', () => {
            expect(result.querySlots(test.slot, 2.5, 0)).toEqual(
              'Dispensed: Daim | Change: $1 (toonie: 0, loonie: 1) | Quantity: 0'
            );
          });
        });
      });
    });
  });

  describe('Restock a product', () => {
    beforeEach(() => {
      test.subject = new VendingMachine(dataProductInventory);
    });

    describe('when product does not exist', () => {
      it('should throw an error', () => {
        expect(() => test.subject.queryProducts('Ring Pop')).toThrow(
          'Invalid Product'
        );
      });
    });

    // describe('when product does exist', () => {
    //   beforeEach(() => {
    //     test.title = 'Laffy Taffy';
    //     result = test.subject;
    //   });

    //   describe('when product ', () => {
    //     it('', () => {
    //       expect(() => result.querySlots('B3', 3)).toThrow('');
    //     });
    //   });
    // });
  });
});
