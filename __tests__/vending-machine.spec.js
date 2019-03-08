const VendingMachine = require('../src/vending-machine');
const data = require('./data.json');

describe('VendingMachine', () => {
  let test;

  beforeEach(() => {
    test = {};
  });

  describe('Purchase a product', () => {
    beforeEach(() => {
      test.subject = new VendingMachine(data.productInventory);
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
        result = test.subject;
      });

      describe('when product is not in stock', () => {
        it('should throw an error', () => {
          expect(() => result.querySlots('B3', 3)).toThrow(
            'Product is out of stock.'
          );
        });
      });

      describe('when product is in stock', () => {
        describe('when payment is invalid', () => {
          it('should throw an error', () => {
            expect(() => result.querySlots('B1', 1)).toThrow(
              'Invalid Payment Amount'
            );
          });
        });

        describe('when payment is valid', () => {
          it('should return a product with no change for exact payment', () => {
            expect(result.querySlots('B1', 1.5)).toEqual('Dispensed: Daim');
          });

          it('should return a product with change', () => {
            expect(result.querySlots('C1', 2)).toEqual(
              'Dispensed: Nerds | Change: $0.25 (toonie: 0, loonie: 0, quarter: 1) | Quantity: 2'
            );
          });

          it('should decrease quantity of product', () => {
            expect(result.querySlots('B1', 2.5)).toEqual(
              'Dispensed: Daim | Change: $1 (toonie: 0, loonie: 1) | Quantity: 0'
            );
          });
        });
      });
    });
  });

  describe('Restock a product', () => {
    beforeEach(() => {
      test.subject = new VendingMachine(data.productInventory);
    });

    describe('when product does not exist', () => {
      it('should throw an error', () => {
        expect(() => test.subject.queryProducts('Ring Pop')).toThrow(
          'Invalid Product'
        );
      });
    });

    describe('when product does exist', () => {
      beforeEach(() => {
        result = test.subject;
      });

      describe('when quantity is equal to max', () => {
        it('it should not restock', () => {
          expect(() => result.queryProducts('Pixy Stix')).toThrow(
            'Product does not need to be restocked.'
          );
        });
      });

      describe('when quantity is less than max', () => {
        it('it should restock to max', () => {
          expect(result.queryProducts('Laffy Taffy')).toEqual(
            'Restocked: Laffy Taffy | Restock Quantity: 1'
          );
        });
      });
    });
  });

  describe('Refill coin drawer', () => {
    beforeEach(() => {
      test.subject = new VendingMachine(data.productInventory, data.coinDrawer);
    });

    describe('when coin does not exist', () => {
      it('should throw an error', () => {
        expect(() => test.subject.queryCoins('Twenty-Five Pence')).toThrow(
          'Invalid Coin'
        );
      });
    });

    describe('when coin does exist', () => {
      beforeEach(() => {
        result = test.subject;
      });

      describe('when quantity is equal to max', () => {
        beforeEach(() => {
          test.title = 'Quarters';

          result = test.subject;
        });

        it('it should not refill', () => {
          expect(() => result.queryCoins(test.title)).toThrow(
            'Coin does not need to be refilled.'
          );
        });
      });

      describe('when quantity is less than max', () => {
        beforeEach(() => {
          test.title = 'Loonies';

          result = test.subject;
        });

        it('it should refill to max', () => {
          expect(result.queryCoins(test.title)).toEqual(
            'Refilled: Loonies | Refill Quantity: 12'
          );
        });
      });
    });
  });
});
