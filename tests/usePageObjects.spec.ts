import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'    

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http:/localhost:4200')
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    
    await pm.navigateTo().formLaoyutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName({lastName: 'O\'Keefe'})
    const randomEmail = `${randomFullName.replace(' ','').replace('\'', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLaoyutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password123', 'Option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCHeckbox(randomFullName, randomEmail, false)
    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(69)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(-69, 420)
})