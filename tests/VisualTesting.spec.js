
import { test, expect } from '@playwright/test';

test("Practice E2E Validation",async({page})=>
{

await page.goto("https://www.google.com");
expect(await page.screenshot()).toMatchSnapshot('landing.png');
});