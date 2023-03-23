type Product = {
    [sku: string]:{
        name: string;
        price: number;
    }
  };

type BulkDiscountOffer = {
    minItemsRequired:number; // minimum number of items required to be added to cart to avail offer
    pricePerItem?: number; // price per item applicable
}
type QuatityDiscountOffer = {
    minItemsRequired:number; // minimum number of items required to be added to cart to avail offer
    numOfItmesToApplyPriceOn?: number; // number of items to apply price
}
 export type PricingRule = {
    offerType: 'BULK_DISCOUNT' |'QUANTITY_DISCOUNT'; // different types of offers/deals which can be increased in future
    offer: QuatityDiscountOffer | BulkDiscountOffer ; // this is the deatils of the offer
  };

  export class Checkout {
    private items: Record<string,number> = {};
    private pricingRules: Record<string,PricingRule>;
    private products: Product;
  
    constructor(pricingRules: Record<string, PricingRule>) {
      this.pricingRules = pricingRules;
      this.products = {
        ipd: { name: "Super iPad", price: 549.99 },
        mbp: { name: "MacBook Pro", price: 1399.99 },
        atv: { name: "Apple TV", price: 109.5 },
        vga: { name: "VGA adapter", price: 30 },
      };
      this.pricingRules=pricingRules;
    //   this.pricingRules = {
    //     ipd:{
    //         offerType: 'BULK_DISCOUNT',
    //         offer: { minItemsRequired :5, pricePerItem : 499.99 }
    //     },
    //     atv:{
    //         offerType: 'QUANTITY_DISCOUNT',
    //         offer: { minItemsRequired :3, numOfItmesToApplyPriceOn: 2 }
    //     },
    //   }
    }

    // function to add or update pricingRules
    public addOrUpdatePricingRules (pricingRule: Record<string, PricingRule>): void{
        const sku = Object.keys(pricingRule)[0];
        if(this.products.hasOwnProperty(sku)){
            this.pricingRules[sku] = pricingRule[sku];
        }else{
            console.log('product does not exist')
        }
    }

    // function to change price of an item if needed
    public changePrice(item: string, price: number): void {
        if( this.products.hasOwnProperty(item) && price>0){
            this.products[item].price=price;
        }else{
            console.log('item not available')
        }
    }

    // function to scan items to add them to the cart for a customer
    public scan(item: string): void {
        if(this.products.hasOwnProperty(item)){
            if(this.items.hasOwnProperty(item)){
                this.items[item]++;
            }else{
                this.items[item]=1;
            }
        }
        else{
            console.log('Item not present in catalogue')
        }
    }
  
    // function to calculate the total amount to be paid
    public total(): number {
      const itemCounts = this.items;
      let total = 0;
  
    for(let sku in itemCounts){
        const productPrice = this.products[sku].price;
        if(!this.pricingRules.hasOwnProperty(sku)){
            total += productPrice * itemCounts[sku];
            continue;
        }
        const priceRule = this.pricingRules[sku];
        const offerType = priceRule.offerType;
        const itemCount = itemCounts[sku];
        if(offerType === "BULK_DISCOUNT"){
            const offer : any = priceRule.offer;
            if(itemCount>= offer.minItemsRequired){
                total += itemCount* offer.pricePerItem;
            }else{
                total += productPrice * itemCount;
            }
        }else{
            const offer : any = priceRule.offer;
            const minItemsRequired = offer.minItemsRequired;
            const numOfItmesToApplyPriceOn = offer.numOfItmesToApplyPriceOn;
            if(itemCount >= minItemsRequired){
                const remainder = itemCount % minItemsRequired;
                total += ((itemCount-remainder)/minItemsRequired) * numOfItmesToApplyPriceOn * productPrice;
                total += (remainder * productPrice);
            }else{
                total += productPrice * itemCount;

            }

        }
    }
  
      return total;
    }
  }

  // The structuring of pricing rules has been done in generic way
  // Below is the pricing rule provided in the problem statement. 
  // To make this pricing rule generic there is offerType and offer(details of the offer)
  // In case of BULK_DISCOUNT we have 2 details
  // 1. minItemsRequired => minimum number of items to be available for a product to avail offer
  // 2. pricePerItem => price applicable on each of the item which can be easily changed by calling addOrUpdatePricingRules()
  // For example,if for ipd the number of items is greater ot equal to 5 then to all these products price applicable would be 499
  // In case of QUANTITY_DISCOUNT we have 2 details
  // 1. minItemsRequired => minimum number of items to be available for a product to avail offer
  // 2. numOfItmesToApplyPriceOn =>  number of items for which the customer has to pay
  // For example, if the customer buys 3 atv's then he will have to pay for only 2 items, if the customer buys 6 atv's
  // then he will have to pay for 4 items, and if the customer buys 5 atv's then he will have to pay for 4 items (Explaination => 
  // for 3 itmes he will pay price of 2 itmes and for remaining 2 items he will have to pay as usual)
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
