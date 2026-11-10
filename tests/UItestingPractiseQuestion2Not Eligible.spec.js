const {test,expect, request, mergeExpects} = require('@playwright/test');
//add the async keyword

function futureDateValue()
{

    const date=new Date();
    date.setDate(date.getDate() + 7);

    return date.toISOString().slice(0,16);
}
async function login(page) {
await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("amardeep.pmp@gmail.com");
    await page.locator("#password").fill("Tcs@1234");
    await page.getByRole('button', { name: 'Sign In' }).click();
    // 1. Locate the anchor link by its role, targeting the nested text
const browseEventsLink =  page.getByRole('link', { name: 'Browse Events →' });

// 2. Assert that the link is completely visible on the UI
await expect(browseEventsLink).toBeVisible();

}


test('Multiple tickets booking is not eligible for refund', async({page,request})=>
{

    const  baseURL='https://eventhub.rahulshettyacademy.com/';
/* Step 1 — Login

- Call your login helper
*/


 
 await login(page);

  
   /*
   Step 2 — Book first event with 1 ticket (default)

- Navigate to /events

- Click Book Now on the very first event card (locate data-testid="event-card" → first → data-testid="book-now-btn")

- Fill Full Name, Email (your email), Phone

- Click confirm button (.confirm-booking-btn)*/

     await page.goto(baseURL + "events");
page.getByText("Book Now").first().click();
page
for(let i=0;i<2;i++)
page.locator('button').filter({ hasText: '+' }).first().click();

 await page.getByLabel('Full Name').fill('Playwright');
 await page.locator ('#customer-email').fill('xyz@abc.com');
 
 await page.getByPlaceholder('+91 98765 43210').fill("+12263456788");
 await page.locator(".confirm-booking-btn").click();
 const bookingLocator =page.locator(".booking-ref");
 await expect(bookingLocator).toBeVisible();
 console.log("text content",await bookingLocator.textContent());
 const bookingRef =  (await bookingLocator.textContent()).trim();
 console.log(bookingRef);

/*
Step 3 — Navigate to booking detail

- Click View My Bookings link

- Assert URL is /bookings

- Click the first View Details link

- Assert: text Booking Information is visible on the page
*/



await page.getByText('View My Bookings').click();
// Automatically handles waiting for the URL to change and updates dynamically
await expect(page).toHaveURL(baseURL + "bookings");
await page.getByRole("button",{name:"View Details"}).first().click();
await expect(page.getByText("Booking Information")).toBeVisible();
const bookingeventString = await page.locator("h1").textContent();

const bookingrefText= await page.getByText(bookingRef).last().textContent();
expect(bookingeventString.trim().charAt(0)).toBe(bookingrefText.trim().charAt(0));
page.getByText("Check eligibility for refund?").click();
// 1. Assert: spinner element is immediately visible (no polling/waiting delay)
await expect(page.locator("#refund-spinner")).toBeVisible({ timeout: 0 });

// 2. Assert: spinner is no longer visible within 6 seconds (waits up to 6000ms)
await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

await expect(page.locator("#refund-result")).toBeVisible();
const stringforFullrefund=await page.locator("#refund-result").textContent();
page.pause();

/*


toContainText (For Web Elements / Locators)

You use this when checking text directly inside a webpage element. 
Because it is a web-first assertion, 
Playwright will automatically wait up to 5 seconds for the element to appear and for the text to match.

// 1. Added missing 'await'
await expect(page.locator("#refund-result")).toBeVisible();

// 2. Direct string containment checks on the locator element
await expect(page.locator("#refund-result")).toContainText("Eligible for refund");
await expect(page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund");

*/

 expect(stringforFullrefund).toContain ("Not eligible for refund");
 expect(stringforFullrefund).toContain ("Group bookings (3 tickets) are non-refundable");
});
