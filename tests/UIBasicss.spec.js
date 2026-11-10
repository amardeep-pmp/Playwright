const {test,expect} = require('@playwright/test');


test('Practice Assignment Playwright test2', async({})=>
{

const email='amardeep.pmp@gmail.com';
page = await 
 await page.goto('https://rahulshettyacademy.com/client');
 console.log(await page.title());
const  products=page.locator(".card-body");
await page.locator(".card-body b").first().waitFor();
const titles=await page.locator(".card-body b").allTextContents();
const count1=await products.count();
console.log(count1)
for(let i=0;i<count1;i++)
{
    if(await products.nth(i).locator("b").textContent()==='ZARA COAT 3')
    {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
}

await page.locator("[routerlink*='cart']").click();
await page.locator('div li').first().waitFor();
const bool = await page.locator("h3:has-Text('ZARA COAT 3')").isVisible();
page.locator('h3:has-text("sadsa")')
expect(bool).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder='Select Country']").pressSequentially("ind");
const dropdown=page.locator(".ta-results");
await dropdown.waitFor();
const count2= await dropdown.locator("button").count();
for(let i=0;i<count2;++i)
{
    if(await dropdown.locator("button").nth(i).textContent()===' India')
    {
        await dropdown.locator("button").nth(i).click();
        break;
    }   
}
await expect(page.locator('.user__name [type=text]').first()).toHaveText(email);
await page.locator('a:has-text("PLACE ORDER")').click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID);

await page.locator('button:has-text("ORDERS")').click();
await page.locator('.table th').first().waitFor();
const counttableentries = await page.locator("tbody tr").count();
console.log(counttableentries);

for(let i=0;i<counttableentries;++i)
{
const string1=await page.locator("tbody tr th").nth(i).textContent();
console.log(string1);
   if(orderID.includes(string1))
   {
    console.log("I am inside if",i);
    await page.locator("tbody tr").locator("button").nth(i).click();
    break;  
   }
    
}


await page.pause();
});


test('test case 2', async({page})=>
{

const email='amardeep.pmp@gmail.com';
 await page.goto('https://rahulshettyacademy.com/client');
 console.log(await page.title());
 });
