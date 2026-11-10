
const { test, expect } = require('@playwright/test');
class CheckOut
{

    constructor(page)
    {
        this.page=page;
        this.Country=page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.button= this.dropdown.locator("button");
        this.submitbutton=page.locator(".action__submit")
        this.userNametext=page.locator(".user__name [type='text']").first()
       this.orderConfirmation= page.locator(".hero-primary");
   this.orderId =  page.locator(".em-spacer-1 .ng-star-inserted");
   
    }

    async performCheckOut(Country)

    {
         await this.Country.pressSequentially(Country);
         
           await this.dropdown.waitFor();
           const optionsCount = await this.button.count();
           for (let i = 0; i < optionsCount; ++i) {
              const text = await this.button.nth(i).textContent();
              if (text.trim() === Country.trim() ) {
                 await this.button.nth(i).click();
                 break;
              }
                
             
           }

    }
    async validateUserName(userName)
    {
             await expect(this.userNametext).toHaveText(userName);
    }
    async clickSubmit()
    {
        await this.submitbutton.click();
        await expect(this.orderConfirmation).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}

module.exports={CheckOut}