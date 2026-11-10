const {test,expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "amardeep.pmp@gmail.com", userPassword: "Tcs@1234"};
const orderpayload={orders: [{country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
let token;
let orderId;
test.beforeAll(async({browser})=>
{

const apicontext=await request.newContext();

const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login" ,  
{
    data:loginPayLoad
});
const loginjsonresponse=await loginResponse.json();
token =loginjsonresponse.token;
const OrderResponse =  await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order" ,  
{
    data:orderpayload,
 headers: {
            Authorization: token,
            "Content-Type": "application/json" 
 } 
 });
  const orderJSONResponse= await OrderResponse.json();
  orderId=orderJSONResponse.orders[0];
});




test("API Practise", async({page})=>
{

    await page.addInitScript(value =>{

    window.localStorage.setItem('token',value);
},token);
    await page.goto("https://rahulshettyacademy.com/client");

 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 console.log(orderId);
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
