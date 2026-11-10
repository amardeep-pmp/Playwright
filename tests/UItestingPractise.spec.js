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


test('Practice API Coding', async({page,request})=>
{

    const  baseURL='https://eventhub.rahulshettyacademy.com/';
/* Step 1 — Login

- Navigate to /login*/
 await login(page);
 await page.goto(baseURL + "admin/events");
  const uniqueTitle = `Test Event ${Date.now()}`; 
  console.log(uniqueTitle);"
 await page.locator("#event-title-input").fill(uniqueTitle);
 await page.locator('#admin-event-form textarea').fill('This is a dynamically generated description for our automated software testing pipeline.');
 await page.getByLabel('City').fill('Bangalore');
 await page.getByLabel('Venue').fill('Top Performer 223');
  await page.getByLabel('Event Date & Time').fill(futureDateValue());
  await page.getByLabel('Price ($)').fill('250.00');
   await page.getByLabel('Total Seats').fill('28.00');
   await page.locator('#add-event-btn').click();
   // or use   // Wait for success toast await expect(page.getByText('Event created!')).toBeVisible();
   const toastmessagesuccess= page.locator('text=Event created!');
   await expect(toastmessagesuccess).toBeVisible();
     await page.goto(baseURL + "events");
//await page.locator("[data-testid=event-card]").first().waitFor();
await expect( page.locator("[data-testid=event-card]").first()).toBeVisible({ timeout: 12000 });

const myEventCard=  page.locator("[data-testid=event-card]").filter({hasText:uniqueTitle});
await expect(myEventCard).toBeVisible();


 
// 3. Read the seat count element inside that specific card
const seatText = await myEventCard.getByText(/seats/i).innerText();

// 4. Parse the integer out of the string and store it
const seatsBeforeBooking = parseInt(seatText.match(/\d+/)[0], 10);
console.log(seatText + "----->"+ seatsBeforeBooking);
 await  myEventCard.locator("[data-testid=book-now-btn]").click();
 const ticketCount=  await page.locator("#ticket-count").innerText();
 expect(ticketCount).toBe('1'); 

 await page.getByLabel('Full Name').fill('Playwright');
 await page.locator ('#customer-email').fill('xyz@abc.com');
 
 await page.getByPlaceholder('+91 98765 43210').fill("+12263456788");
 await page.locator(".confirm-booking-btn").click();
 //await page.pause();
 /* To chain multiple classes together in a locator, you simply list the classes back-to-back, starting each individual class with a dot (.), and leaving absolutely no spaces between them.
Here is how you chain them for your element:
javascript
// Matches an element that has ALL of these classes at the same time
page.locator(".booking-ref.font-mono.font-bold.text-indigo-600");*/
const bookingLocator =page.locator(".booking-ref");
 await expect(bookingLocator).toBeVisible();
 const bookingRef =  (await bookingLocator.innerText()).trim();
 console.log(bookingRef);

/*Step 7 — Verify in My Bookings

- Click the link View My Bookings

- Assert: URL is BASE_URL/bookings

- Get all booking cards (locate by id #booking-card)

- Assert the first booking card is visible

- Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text

- Assert that matched card is visible

- Assert that matched card contains your eventTitle text*/

await page.getByText('View My Bookings').click();
// Automatically handles waiting for the URL to change and updates dynamically
await expect(page).toHaveURL(baseURL + "bookings");
await expect(page.locator('#booking-card').first()).toBeVisible({timeout:12000});
const bookingreflocator=page.locator('.booking-ref').filter({hasText:bookingRef})

await expect(bookingreflocator).toBeVisible({timeout:12000});

const TestEventLocator= page.locator('h3').filter({ hasText: uniqueTitle });

await expect(TestEventLocator).toBeVisible({timeout:12000});
/* - Navigate back to /events

- Assert the first event card is visible

- Filter cards again using hasText: eventTitle

- Assert the card is visible

- Read the seat count text again (same as Step 3) — store as seatsAfterBooking

- Assert: seatsAfterBooking === seatsBeforeBooking - 1
*/

    await page.goto(baseURL + "events");
//await page.locator("[data-testid=event-card]").first().waitFor();
await expect( page.locator("[data-testid=event-card]").first()).toBeVisible({ timeout: 12000 });

const myEventCard1=  page.locator("[data-testid=event-card]").filter({hasText:uniqueTitle});
await expect(myEventCard1).toBeVisible();


 
// 3. Read the seat count element inside that specific card
const seatText1 = await myEventCard1.getByText(/seats/i).innerText();

// 4. Parse the integer out of the string and store it
const seatsAfterBooking = parseInt(seatText1.match(/\d+/)[0], 10);
console.log(seatsBeforeBooking + "----->"+ seatsAfterBooking);
expect(seatsBeforeBooking-seatsAfterBooking).toBe(1);

 
});
