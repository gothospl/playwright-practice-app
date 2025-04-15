import { test } from '../test-options'
import { faker } from '@faker-js/faker'

test('parametrized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','').replace('\'', '').replace('Mr.', '').replace('Mrs.', '').toLowerCase()}${faker.number.int(1000)}@test.com`

    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USER, process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCHeckbox(randomFullName, randomEmail, false)
})