const base = require('@playwright/test');
const{APIutils}=require('./APIutils.js');
const {request} = require('@playwright/test');
const loginpayload={userEmail: "amardeep.pmp@gmail.com", userPassword: "Tcs@1234"};
const orderpayload={orders: 
[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};


exports.customtest = base.test.extend({

authenticatePage : async({browser},use) =>{

const context = await browser.newContext();
const page = await context.newPage();
 
await page.goto('https://rahulshettyacademy.com/client');
 console.log(await page.title());

await page.locator("#userEmail").fill("amardeep.pmp@gmail.com");
await page.locator("#userPassword").fill("Tcs@1234");
await page.locator("#login").click();
await page.locator(".card-body b").first().waitFor();
await use(page);
},

createOrder : async({},use) =>{

  const apicontext = await request.newContext();
  const apiUtils=new APIutils(apicontext,loginpayload);
  const  response = await apiUtils.createOrder(orderpayload);
  await use(response);
},

}

);