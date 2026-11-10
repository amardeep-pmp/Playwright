class DashboardPage
{

    constructor(page)
    {

        this.Products=page.locator(".card-body");
        this.ProductTitles=page.locator(".card-body b");
        this.Cart=page.locator("[routerlink*='cart']");
    }
    async searchProduct(productName)
    {

       
   await this.ProductTitles.first().waitFor();
   const titles = await this.ProductTitles.allTextContents();
   console.log(titles); 
   const count = await this.Products.count();
   for (let i = 0; i < count; ++i) 
    {
      if (await this.Products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await this.Products.nth(i).locator("text= Add To Cart").click();
         break;
      }
    }
    }

   async NaviagtetoCarts()
   {
        await this.Cart.click();
    }

}

module.exports={DashboardPage}