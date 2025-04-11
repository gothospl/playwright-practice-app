import { Page } from "@playwright/test";
import { expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase{
    
    constructor(page: Page){
        super(page)
    }

    async selectCommonDatepickerDateFromToday(numberOfDaysFromToday: number){
        const calendarInputField = this.page.getByPlaceholder("Form Picker")
        await calendarInputField.click()
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatepickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number){
        const calendarInputField = this.page.getByPlaceholder("Range Picker")
        await calendarInputField.click()
        const startDateToAssert = await this.selectDateInTheCalendar(startDateFromToday)
        const endDateToAssert = await this.selectDateInTheCalendar(endDateFromToday)
        const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthandYear = ` ${expectedMonthLong} ${expectedYear} `
        
        if(numberOfDaysFromToday >= 0){
            while(!calendarMonthAndYear.includes(expectedMonthandYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            }
        } else {
            while(!calendarMonthAndYear.includes(expectedMonthandYear)){
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]').click()
                calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            }
        }

        const dayCell = this.page.locator('[class="day-cell ng-star-inserted"]')
        const rangeCell = this.page.locator('[class="range-cell day-cell ng-star-inserted"]')
        if(await dayCell.first().isVisible()){
            await dayCell.getByText(expectedDate, {exact: true}).click()
        } else {
            await rangeCell.getByText(expectedDate, {exact: true}).click()
        }
        
        return dateToAssert
    }
}