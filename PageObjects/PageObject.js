const{LoginPage}=require('../PageObjects/LoginPage.js'); 
const{DashboardPage} = require('../PageObjects/DashboardPage.js'); 
const{MyCart} = require('../PageObjects/MyCart.js'); 
 const{CheckOut} = require('../PageObjects/CheckOut.js'); 
  const{OrderHistory} = require('../PageObjects/OrderHistory.js');
  
  class PageObject
{
constructor(page)
{
    this.page=page
    this.loginPage=new LoginPage(this.page);
    this.dashboardPage=new DashboardPage(this.page);
    this.myCart=new MyCart(this.page);
    this.checkOut=new CheckOut(this.page);
    this.orderHistory=new OrderHistory(this.page);

}

getLogin()
{
    return this.loginPage;
}
getDashboard()
{
 return  this.dashboardPage;
}
getCart()
{
    return this.myCart;
}

getCheckOut()
{
    return this.checkOut;
}
getOrderHistory()
{
    return this.orderHistory;

}


}

module.exports={PageObject}