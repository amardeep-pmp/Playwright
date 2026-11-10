import { test, expect } from '@playwright/test';


test("Practice E2E Validation",async({browser})=>
{

      const context=await browser.newContext();
     const page=await context.newPage();
     await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("amardeep.pmp@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Tcs@1234");
    await page.getByRole("button",{name:"login"}).click();
    

await page.waitForLoadState('networkidle');
await page.locator(".card-body").filter({hasText:"IPHONE 13 PRO"}).getByRole("button", {name:" Add To Cart"}).click();  

page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
await page.pause();

await page.getByRole("button",{name:"Checkout"}).click();
await page.pause();
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
await page.getByPlaceholder("Select Country").pressSequentially('INDIA',{delay:100});
await page.waitForLoadState('networkidle');
//await page.getByRole("button",{name :"India"}).nth(1).click();
await page.getByText("India").nth(1).click();

    


//await page.locator(".action__submit").click();
await page.getByText('Place Order').click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();
//await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderLabel = page.getByText(/\|\s*[a-f0-9]{24}/);
const orderID = await orderLabel.textContent();

const FinalOrderID = orderID.split('|')[1].trim();
console.log(FinalOrderID);
await page.getByRole("button",{name:'ORDERS'}).click();
await page.waitForLoadState('networkidle');
await page.getByRole("row",{name:FinalOrderID}).getByRole("button",{name:'View'}).click();
await page.pause();
await expect(page.getByText(FinalOrderID)).toBeVisible();
await page.pause();

});
