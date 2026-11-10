const {test,expect, request} = require('@playwright/test');
const{APIutils}=require('./utils/APIutils');
const loginpayload={userEmail: "amardeep.pmp@gmail.com", userPassword: "Tcs@1234"};
const orderpayload={orders: 
[{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}; 
let token;
let orderID;
let response;
test.beforeAll(async()=>
{

   const apicontext = await request.newContext();
  const apiUtils=new APIutils(apicontext,loginpayload);
  
    response = await apiUtils.createOrder(orderpayload);





});

test('Practice Assignment Playwright test2', async({page})=>
{
 
await page.addInitScript(value =>{

    window.localStorage.setItem('token',value);
},response.token);
const email='amardeep.pmp@gmail.com';
 await page.goto('https://rahulshettyacademy.com/client');

await page.locator('button:has-text("ORDERS")').click();
await page.locator('.table th').first().waitFor();
const counttableentries = await page.locator("tbody tr").count();
console.log(counttableentries);

for(let i=0;i<counttableentries;++i)
{
const string1=await page.locator("tbody tr th").nth(i).textContent();
console.log(string1);
   if(response.orderID.includes(string1))
   {
    console.log("I am inside if",i);
    await page.locator("tbody tr").locator("button").nth(i).click();
    break;  
   }
    
}


await page.pause();
});
