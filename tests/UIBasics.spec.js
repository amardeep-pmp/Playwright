const {test,expect} = require('@playwright/test');

test('First Playwright test',async ({browser})=>
{
const context = await browser.newContext();
const page=await context.newPage();
 await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
 console.log(await page.title());
 await page.locator("#username").fill("newuser");
 await page.locator("#password").fill("newpassword");
 await page.locator("#signInBtn").click();
  await page.locator("#username").fill("newuser");
 await page.locator("#password").fill("newpassword");
 await page.locator("#signInBtn").click();
 if(await expect(page.locator("[style*='block']")).toContainText('Incorrect'))
    console.log("I am here in If");
else
    console.log("I am here in else");
});

test('Page Playwright test', async({page})=>
{

 await page.goto('https://google.com');
 
 await expect(page).toHaveTitle("Google");
 await page.locator("#input").fill("abc");
});

test("Test Radio Buttons and Dropdowns", async({page})=>
   {
 
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
 await page.locator("#username").fill("newuser");
 await page.locator("#password").fill("newpassword");
 const dropdown=page.locator("select.form-control");
 //Dropdown selection
 await dropdown.selectOption("consult");
 //Radio button selection
 const radiobutton=page.locator(".radiotextsty");
await radiobutton.last().click();

 console.log(await radiobutton.last().isChecked());
 await expect(radiobutton.last()).toBeChecked();
await page.locator("#okayBtn").click();

const checkbox=page.locator("#terms");
await checkbox.click();
console.log(await checkbox.isChecked());
await expect(checkbox).toBeChecked();

 
 //await page.pause();


   });

   test.only('testing sub page',async ({browser})=>
{
const context = await browser.newContext();
const page=await context.newPage();
const documentLink=page.locator("[href*='documents-request']");
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await page.locator("#username").fill("newuser");
const [newPage]=await Promise.all(
    [context.waitForEvent('page'), 
     documentLink.click(),
    ]
)
const text= await newPage.locator(".red").textContent();
console.log(text);
const a=["abc","xyz"];
console.log(a[0]);
});
/*
test('Practice Assignment Playwright test', async({page})=>
{

 await page.goto('https://rahulshettyacademy.com/client');
 console.log(await page.title());
 await page.locator("a.text-reset").click();
 await page.locator("#firstName").fill("Amardeep");
 await page.locator("#lastName").fill("Singh");
 await page.locator("#userMobile").fill("226-338-1992");
await page.locator("#userEmail").fill("amardeep.pmp@gmail.com");



 
});*/
