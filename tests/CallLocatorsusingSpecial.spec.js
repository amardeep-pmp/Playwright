import { test, expect } from '@playwright/test';
 
test('Playwright Special locators', async ({ page }) => {
  const slowexpect=expect.configure({timeout:9000});
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.locator('input[name="email"][type="text"]').fill("abc@123.com");
    await page.pause();
    await page.locator('input[name="name"][type="text"]').fill("abc");
     await page.pause();
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
    await expect(page.locator('h1:has-text("Shop Name")')).toHaveText('Shop Name');
    
    //locator(css)
 
});