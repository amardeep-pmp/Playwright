import { test, expect } from '@playwright/test';


test("Practice E2E Validation",async({browser})=>
{

      const context=await browser.newContext();
     const page=await context.newPage();
     await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("amardeep.pmp@gmail.com");
await page.locator("#userPassword").fill("Tcs@1234");
await page.locator(".login-btn").click();
await page.locator(".card-body b").first().waitFor();
const products = page.locator(".card-body");

const count =await products.count();
console.log(count);
for(let i=0;i<count;i++)
{
     console.log(await products.locator("b").nth(i).textContent());
    if(await products.locator("b").nth(i).textContent()==='iphone 13 pro')
    {

        await products.locator("text=' Add To Cart'").nth(i).click();
        break
    }
    
}

await page.locator("[routerlink*='cart']").click();

await page.locator("text='Checkout'").click();
await page.locator(".form__cc input").nth(0).fill("4567 8965 4312 1234");
await page.locator(".form__cc input").nth(1).fill("617");
await page.locator(".form__cc input").nth(2).fill("Amardeep");


const expiryMonthDropdown = page.locator('select.input.ddl').nth(0);

// Target all option tags inside this dropdown
const monthOptions = expiryMonthDropdown.locator('option');
// Get the total count of choices (e.g., 12)
const totalMonths = await monthOptions.count(); 

// Select using the last available index position (12 - 1 = 11)
await expiryMonthDropdown.selectOption({ index: totalMonths - 1 });


// --- 2. Dynamically Select the Last Day ---
const expiryDayDropdown = page.locator('select.input.ddl').nth(1);

const dayOptions = expiryDayDropdown.locator('option');
// Get the total count of choices (e.g., 31)
const totalDays = await dayOptions.count(); 

// Select using the last available index position (31 - 1 = 30)
await expiryDayDropdown.selectOption({ index: totalDays - 1 });
await page.locator("[placeholder*='Country']").pressSequentially('INDIA',{delay:100});
await page.locator(".ta-results span").first().waitFor();
console.log(await page.locator(".ta-results span").nth(0).textContent());
console.log(await page.locator(".ta-results span").nth(1).textContent());

const count1=await page.locator(".ta-results span").count();
console.log(count1);


for(let i=0;i<count1;i++)
{
    if(await page.locator(".ta-results span").nth(i).textContent()===' India')
    {
        console.log(await page.locator(".ta-results span").nth(i).textContent());
        await page.locator(".ta-results span").nth(i).click();
        break;
    }
}

await page.locator(".action__submit").click();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderID=await page.locator('label.ng-star-inserted').textContent();
const FinalOrderID=orderID.split('|')[1].trim();
console.log(FinalOrderID);
await page.locator("button[routerlink*='orders']").click();
const rows=page.locator("tbody tr");
await  rows.first().waitFor();
const nooforderentries=await  rows.count();
console.log(nooforderentries);
for(let i=0;i<nooforderentries;i++)
{console.log("OO",await rows.nth(i).locator("th").textContent());
    if(await rows.nth(i).locator("th").textContent()===FinalOrderID) 
    {
        await rows.nth(i).locator("td button").filter({hasText:'View'}).click();
console.log("Order is present at ",i +"row");
break;

    }
}
await expect(page.locator(".col-text")).toHaveText(FinalOrderID)
await page.pause();

});
