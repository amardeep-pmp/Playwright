class OrderHistory
{

    constructor(page)
    {
        this.page=page;
        this.orderhistory=page.locator("button[routerlink*='myorders']");
        this.tablebody=page.locator("tbody");
        this.tablerows= page.locator("tbody tr");
        this.orderID= page.locator(".col-text");


    }
    
    async SearchOrderhistory(orderId)
    {
         await this.orderhistory.click();
   await this.tablebody.waitFor();
   const rows = this.tablerows;

   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
                    await rows.nth(i).locator("button").first().click();
                     break;
        }
        }
    }
   async validateOrder()
   {
    console.log("I am here2")
        return this.orderID.textContent();
    }
}

module.exports={OrderHistory}