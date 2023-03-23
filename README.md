

## Description

This is a checkout system.
Tech stack used:-


[TypeScript]() laguage



## Installation

Install ts-node if not installed previously.
```bash
$ npm install ts-node
```

## Running the code

```bash
# to run code
$ ts-node index.ts

```

## Test

```bash
# unit tests
$ ts-node index.test.ts
```

## Goal
After completion of the project there will be a fully functional checkout system that fulfils the requirements described in the problem statement.

## Approach and Assumptions 

### 1. Pricing rules

  The structuring of pricing rules has been done in generic way.
  To make this pricing rule generic there is offerType and offer(details of the offer).

  OfferType can be of 2 types
  - BULK_DISCOUNT
  - QUANTITY_DISCOUNT

  In case of `BULK_DISCOUNT` we have 2 details
  - `minItemsRequired` => minimum number of items to be available for a product to avail offer.
  - `pricePerItem` => price applicable on each of the item which can be easily changed by calling addOrUpdatePricingRules().
  
  For example,if for ipd the number of items is greater ot equal to 5 then to all these products price applicable would be 499.

  In case of `QUANTITY_DISCOUNT` we have 2 details:
  - `minItemsRequired` => minimum number of items to be available for a product to avail offer.
  - `numOfItmesToApplyPriceOn` =>  number of items for which the customer has to pay.
  
  For example, if the customer buys 3 atv's then he will have to pay for only 2 items, if the customer buys 6 atv's
  then he will have to pay for 4 items, and if the customer buys 5 atv's then he will have to pay for 4 items. (Explaination => 
  for 3 itmes he will pay price of 2 itmes and for remaining 2 items he will have to pay as usual).
```ruby
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

type BulkDiscountOffer = {
    minItemsRequired:number;
    pricePerItem?: number; 
}
type QuatityDiscountOffer = {
    minItemsRequired:number;
    numOfItmesToApplyPriceOn?: number;price
}
  type PricingRule = {
    offerType: 'BULK_DISCOUNT' |'QUANTITY_DISCOUNT'; 
    offer: QuatityDiscountOffer | BulkDiscountOffer ; 
  };
```

### Functionalities provided
- `scan` > to scan items to add them to the cart for a customer
- `total` > to calculate the total amount to be paid.
- `addOrUpdatePricingRules`> to add or update pricingRules, below is a demonstration of  its usecase.
```ruby
const test = new Checkout(pricingRules);
test.scan("ipd");
test.scan("ipd");
test.scan("ipd");
test.addOrUpdatePricingRules({ipd:{offerType: 'QUANTITY_DISCOUNT', offer: {
    minItemsRequired :4,
    numOfItmesToApplyPriceOn: 3
}}})
```
- `changePrice` > to change price of an item if needed
```ruby
const test5 = new Checkout(pricingRules);

test5.changePrice('atv',10)
test5.changePrice('ipd',20)
test5.scan("atv");
test5.scan("atv");
```

### Example of implementation

```ruby
const test1 = new Checkout(pricingRules);
test1.scan("atv");
test1.scan("atv");
test1.scan("atv");
test1.scan("vga");
console.log('Expected output for ',test1.total());
```
Output for above example would be 249.


