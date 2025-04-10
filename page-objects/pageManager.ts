import { Page, expect } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLaoyutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datePickerPage'

export class PageManager{

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLaoyutsPage
    private readonly datepickerPage: DatepickerPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLaoyutsPage(this.page)
        this.datepickerPage = new DatepickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatepickerPage(){
        return this.datepickerPage
    }
}