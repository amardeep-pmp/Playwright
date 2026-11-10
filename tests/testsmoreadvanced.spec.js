const {test,expect} = require('@playwright/test');

test('More advanced  Playwright test',async ({page})=>
{
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
     page.on('dialog',dialog=>dialog.dismiss());
     //await page.locator('#alertbtn').click();
     await page.getByRole('button', { name: 'Alert' }).click();
     await page.locator('#mousehover').hover();
     const framelocator=page.frameLocator("#courses-iframe");
     await framelocator.locator("a[href*='lifetime-access']:visible").click();
     const text=await framelocator.locator('.text h2').textContent();
      const parts1= text.split(" ");
      const text2=parts1[1];
     console.log(text2);



     
});