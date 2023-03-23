import { Checkout, PricingRule } from './index';

const pricingRules : Record<string, PricingRule> ={
    ipd:{
        offerType: 'BULK_DISCOUNT',
        offer: {
            minItemsRequired :5,
            pricePerItem : 499.99
        }
    },
    atv:{
        offerType: 'QUANTITY_DISCOUNT',
        offer: {
            minItemsRequired :3,
            numOfItmesToApplyPriceOn: 2
        }
    },

  }

const test1 = new Checkout(pricingRules);

test1.scan("atv");
test1.scan("atv");
test1.scan("atv");
test1.scan("vga");
console.log('Expected output for ',test1.total()); // expected output: 249

const test2 = new Checkout(pricingRules);

test2.scan("atv");
test2.scan("ipd");
test2.scan("ipd");
test2.scan("atv");
test2.scan("ipd");
test2.scan("ipd");
test2.scan("ipd");
console.log('Expected output for test2 is 2718.95: output',test2.total()); // expected output: 2718.95

const test3 = new Checkout(pricingRules);

test3.scan("random");
test3.scan("random");
console.log('Expected output for test3 is 0: output',test3.total()); // expected output: 0, as random sku doesnt exists

const test4 = new Checkout(pricingRules);

test4.scan("atv");
test4.scan("atv");
test4.scan("atv");
test4.scan("atv");
test4.scan("atv");
test4.scan("atv");
console.log('Expected output for test4 is 40: output',test4.total()); // expected output: 40

const test5 = new Checkout(pricingRules);

test5.changePrice('atv',10)
test5.changePrice('ipd',20)
test5.scan("atv");
test5.scan("atv");
test5.scan("atv");
test5.scan("ipd");
test5.scan("ipd");
test5.scan("ipd");
console.log('Expected output for test5 is 80: output',test5.total()); // expected output: 80

const test6 = new Checkout(pricingRules);


test6.scan("atv");
test6.scan("atv");
test6.scan("atv");
test6.scan("ipd");
test6.scan("ipd");
test6.scan("ipd");
test6.scan("ipd");
test6.addOrUpdatePricingRules({ipd:{offerType: 'QUANTITY_DISCOUNT', offer: {
    minItemsRequired :4,
    numOfItmesToApplyPriceOn: 3
}}})
console.log('Expected output for test6 is 1868.97: output',test6.total()); // expected output: 1868.97

// adding an offer to a product
const test7 = new Checkout(pricingRules);

test7.scan("atv");
test7.scan("atv");
test7.scan("vga");
test7.scan("vga");
test7.scan("vga");
test7.scan("vga");
test7.addOrUpdatePricingRules({vga:{offerType: 'BULK_DISCOUNT', offer: {
    minItemsRequired :4,
    pricePerItem: 20
}}})
console.log('Expected output for test7 is 299',test7.total()); // expected output: 299