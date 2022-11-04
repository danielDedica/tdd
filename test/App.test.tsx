import  App from '../src/App'

import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('form', () => {
    const testData = {
        NAME: 'username',
        AGE: '40',
        INVALID_AGE: '10',
        INVALID_NAME: '09128309123;123.'
    }

    beforeEach(() => {
        render(<App/>)
    })

    afterEach(cleanup)

    it('renders form component', () => {
       expect(screen.getByRole('form')).toBeDefined()
    })

    it('contains input field name', () => {
        expect(screen.getByLabelText('Name')).toBeDefined()
    })

    it('contains input field age', () => {
        expect(screen.getByLabelText('Age')).toBeDefined()
    })

    it('contains checkbox field', () => {
        expect(screen.getByRole('checkbox')).toBeDefined()
    })

    it('contains submit button', () => {
        expect(screen.getByRole('button', {name: /submit/i}))
    })

    it('contains reset button', () => {
        expect(screen.getByRole('button', {name: /reset/i}))
    })

    it('can type in input field name', async () => {
        await userEvent.type(screen.getByLabelText('Name'), testData.NAME)
        expect(screen.getByLabelText('Name')).toHaveProperty('value', testData.NAME)
    })

    it('can type in input field age', async () => {
        await userEvent.type(screen.getByLabelText('Age'), testData.AGE)
        expect(screen.getByLabelText('Age')).toHaveProperty('value', testData.AGE)
    })

    it('can check and uncheck checkbox', async () => {
        await userEvent.click(screen.getByRole('checkbox'))
        expect(screen.getByRole('checkbox', { checked: true })).toBeTruthy()
        
    })

    it('cleans values on click reset', async () => {
        await userEvent.type(screen.getByLabelText('Name'), testData.NAME)
        await userEvent.type(screen.getByLabelText('Age'), testData.AGE)
        await userEvent.click(screen.getByRole('checkbox'))

        await userEvent.click(screen.getByRole('button', {name: /reset/i}))
        
        expect(screen.getByLabelText('Name')).toHaveProperty('value', '')
        expect(screen.getByLabelText('Age')).toHaveProperty('value', '0')
        expect(screen.getByRole('checkbox')).toHaveProperty('checked', false)
        
    })

    it('shows error message for invalid name', async () => {
        await userEvent.type(screen.getByLabelText('Age'), testData.AGE)
        
        await userEvent.type(screen.getByLabelText('Name'), '       ')

        await userEvent.click(screen.getByRole('button', {name: /submit/i}))

        expect(screen.getByText('Ingrese un nombre valido', {exact: false})).toBeDefined()

        await userEvent.clear(screen.getByLabelText('Name'))

        await userEvent.type(screen.getByLabelText('Name'), testData.INVALID_NAME)

        await userEvent.click(screen.getByRole('button', {name: /submit/i}))

        expect(screen.getByText('Ingrese un nombre valido', {exact: false})).toBeDefined()
    })

    it('shows error message for invalid age', async () => {
        await userEvent.type(screen.getByLabelText('Name'), testData.NAME)
        await userEvent.type(screen.getByLabelText('Age'), testData.INVALID_AGE)

        await userEvent.click(screen.getByRole('button', {name: /submit/i}))

        expect(screen.getByText('Debe ser mayor de edad', {exact: false})).toBeDefined()
    })

    it('shows info when clicks submit', async () => {
        await userEvent.type(screen.getByLabelText('Name'), testData.NAME)
        await userEvent.type(screen.getByLabelText('Age'), testData.AGE)

        await userEvent.click(screen.getByRole('button', {name: /submit/i}))
        
        expect(screen.getByRole('list')).toBeDefined()
    })
})