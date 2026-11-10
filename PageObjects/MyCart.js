
const { test, expect } = require('@playwright/test');
class MyCart
{
         

       constructor(page)
       {
         this.page=page;
        this.ProductCheckOut= page.locator("div li").first();
        this.CheckOut= page.locator("text=Checkout").first();
       }

       async verifyProducts(productName)
       {
           
            await  this.ProductCheckOut.waitFor();

            const bool=await this.getProductName(productName).isVisible();
            expect(bool).toBeTruthy();

       }
       async navigatetoCheckout()
       {

           await this.CheckOut.click();
       }
       getProductName(productName)
    {
        return this.page.locator("h3:has-text('"+ productName +"')");
    }
}
 
module.exports={MyCart};