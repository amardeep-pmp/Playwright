const {test,expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "amardeep.pmp@gmail.com", userPassword: "Tcs@1234"};
const orderpayload={orders: [{country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5"}]};
 let response ={};
class APIutilsPractise{

 constructor(apicontext, loginPayLoad){
        this.apicontext=apicontext;
        this.loginPayLoad=loginPayLoad;


    }

    async getToken(){
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login" ,  
{
    data:this.loginPayLoad
});
const loginjsonresponse=await loginResponse.json();
const token =loginjsonresponse.token;
return token;
        
                    }

    async createOrder(orderpayload){

 //Order API
    let response ={};
    response.token=getToken();
    
    const OrderResponse =  await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order" ,  
{
    data:orderpayload,
 headers: {
            Authorization: token,
            "Content-Type": "application/json" 
 } 
 });
  const orderJSONResponse= await OrderResponse.json();
  response.orderId=orderJSONResponse.orders[0];

  return response;

    }

                }
test.beforeAll(async()=>
{
    const apiContext=await request.newContext();
const APIutilPractiseobj=new APIutilsPractise(apiContext, loginPayLoad);

response=await createOrder(orderpayload);

});




test("API Practise", async({page})=>
{
 
    await page.addInitScript(value =>{

    window.localStorage.setItem('token',value);
},response.token);
    await page.goto("https://rahulshettyacademy.com/client");

 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("tbody").waitFor();
const rows = await page.locator("tbody tr");
 
 console.log(orderId);
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
//await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  await page.pause();
});
