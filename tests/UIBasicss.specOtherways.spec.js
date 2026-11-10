const {test,expect} = require('@playwright/test');


test('Practice Assignment Playwright test2', async({page})=>
{

const email='amardeep.pmp@gmail.com';
 await page.goto('https://rahulshettyacademy.com/client');
 console.log(await page.title());
const  products=page.locator(".card-body");
await page.getByPlaceholder('email@example.com').fill("amardeep.pmp@gmail.com");
await page.getByPlaceholder('enter your passsword').fill("Tcs@1234");
await page.getByRole('button',{name:'Login'}).click();
await page.locator(".card-body b").first().waitFor();
await expect(page.getByText('ZARA COAT 3')).toBeVisible();

await page.locator(".card-body")   .filter({hasText:"ZARA COAT 3"})
.getByRole('button',{name:"Add to Cart"}).click();

await page.getByRole('listitem').getByRole('button',{name:"Cart"}).click();
await expect(page.getByText('ZARA COAT 3')).toBeVisible();
await page.getByRole("button",{name:'Checkout'}).click();
await page.getByPlaceholder("Select Country").pressSequentially("ind");

await page.getByRole("button",{name:'India'}).nth(1).click();
await page.getByText('PLACE ORDER').click();
await expect(page.getByText('Thankyou for the order.')).toBeVisible();
const fullOrderText1 = await page.getByText(/[a-f0-9]{24}/).textContent();
console.log(fullOrderText1);
await page.getByRole('button',{name:'Orders'}).click();
await page.locator('.table th').first().waitFor();  

const orderIdElement = page.getByText(/[a-f0-9]{24}/).first();
const fullOrderText = (await orderIdElement.textContent())?.trim() || '';
console.log(`Captured Order ID Text: ${fullOrderText}`);
// 3. Verify visibility using an implicit auto-waiting assertion
// (The explicit table header wait is usually redundant here)
await expect(page.getByText(fullOrderText)).toBeVisible();
await page.pause();
});

