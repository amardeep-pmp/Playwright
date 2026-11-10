import { test, expect } from '@playwright/test';

test("2nd  Page Validation",async({browser})=>
{

    const context=await browser.newContext();
     const page=await context.newPage();

     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

     const documentLink1=await page.locator("[href*=documents-request]")

     const [newPage]=await Promise.all([
     context.waitForEvent('page'),
       
         documentLink1.click()]);
         await page.pause();
        const  domain222 = await newPage.locator(".red").textContent();

const arrayText=domain222.split("@");
    const FinalDomain=arrayText[1].split(" ");
    console.log(FinalDomain[0]);

     
    

/*

const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    console.log(text);
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
    */
    }
 
)

