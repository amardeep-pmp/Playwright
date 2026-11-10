class APIutils
{
  constructor(apicontext,loginpayload)
  {

      this.apicontext=apicontext;
      this.loginpayload=loginpayload
  }

async getToken()
{
    const loginresponse=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {data:this.loginpayload

    });
   // expect(loginresponse.ok()).toBeTruthy();
  const loginjsonresponse= await loginresponse.json();
  
 const token= loginjsonresponse.token;
 console.log(token);
return token;

}
async createOrder(orderpayload)
{
    //Order API
    let response ={};

    response.token=await this.getToken();
    
    const orderresponse=await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {data:orderpayload,
         headers:{
            'Authorization':response.token,
            'Content-type': 'application/json'
         }
        });
      //  expect(orderresponse.ok()).toBeTruthy();
      const orderjsonresponse= await orderresponse.json();
      console.log(orderjsonresponse);
    response.orderID=orderjsonresponse.orders[0];
    console.log(response.orderID);
     console.log(orderjsonresponse.productOrderId[0]);
     console.log(orderjsonresponse.message);    
    return response;
}
}
module.exports = {APIutils};