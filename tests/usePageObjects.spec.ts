import {test, expect} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLaoyutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http:/localhost:4200')
})

test('navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLaoyutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLaoyutsPage(page)
    const onDatepickerPage = new DatepickerPage(page)

    await navigateTo.formLaoyutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'password123', 'Option 2')
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCHeckbox('John Winchester', 'johnwin@test.com', false)
    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatepickerDateFromToday(69)
    await onDatepickerPage.selectDatepickerWithRangeFromToday(-69, 420)
})