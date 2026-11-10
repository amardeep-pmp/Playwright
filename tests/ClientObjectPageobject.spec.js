const { test, expect } = require('@playwright/test');
const {PageObject} = require('../PageObjects/PageObject');

const dataSet= JSON.parse(JSON.stringify(require("./TestData.json")));
for(const data of dataSet)
{
test(`Client App login ${data.productName}`, async ({ page }) => {
   //js file- Login js, DashboardPage
   /*const username = "amardeep.pmp@gmail.com";
   const password="Tcs@1234";
   const productName = 'ZARA COAT 3';*/
  
   const pageObject=new PageObject(page);
  const  loginPage= pageObject.getLogin();
  const dashboardPage=pageObject.getDashboard();
  const myCart=pageObject.getCart();
  const checkOut=pageObject.getCheckOut();
  const orderHistory=pageObject.getOrderHistory();
  
  await  loginPage.goTo();
  await  loginPage.validLogin(data.username,data.password);
  await  dashboardPage.searchProduct(data.productName);
  await  dashboardPage.NaviagtetoCarts();

   //await page.pause();
await myCart.verifyProducts(data.productName);
await myCart.navigatetoCheckout();
 
await checkOut.performCheckOut('India');
 await    checkOut.validateUserName(data.username);
  const orderId= await checkOut.clickSubmit();

    await orderHistory.SearchOrderhistory(orderId);
    
   const orderIdDetails = await orderHistory.validateOrder();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

}






