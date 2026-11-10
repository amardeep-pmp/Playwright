const {test,expect} = require('@playwright/test');

const { customtest } = require("./utils/fixtures.js");

 customtest('Practice Assignment utils', async({ authenticatePage, createOrder,testDataForOrder})=>
    {

    /*    //Login and create order and 
await authenticatePage.goto('https://rahulshettyacademy.com/client' );
await authenticatePage.locator('button:has-text("ORDERS")').click();
await authenticatePage.locator('.table th').first().waitFor();
await expect(authenticatePage.getByText(createOrder.OrderID)).toBeVisible(); */

 await authenticatePage.goto('https://rahulshettyacademy.com/client');
   await authenticatePage.locator("button[routerlink*='myorders']").click();
   await authenticatePage.locator("tbody").waitFor();
   await expect(authenticatePage.getByText(createOrder.orderID)).toBeVisible();
   console.log(testDataForOrder.productName);
    }
);                                                                                                                                                                                       