import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {
    // by Tag name
    await page.locator('input').first().click()

    // by ID
    await page.locator('#inputEmail1').click()

    // by Class value
    page.locator('.shape-rectangle')

    // by Attribute
    page.locator('[placeholder="Email"]')

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle[nbinput]')

    // by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid)')
})

test('user facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()
    
    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId("SignIn").click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click() //AVOID
})

test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByPlaceholder('Email').click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByPlaceholder('Email').click()
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByPlaceholder('Email').click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByPlaceholder('Password').click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByPlaceholder('Email').click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByPlaceholder('Email').click()
})

test('Reusing the locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByPlaceholder('Email')

    await emailField.fill('test@test.com')
    await basicForm.getByPlaceholder('Password').fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue("test@test.com")
})