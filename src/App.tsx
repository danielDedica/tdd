import { useState, FormEvent, FC, ReactElement, ChangeEvent } from 'react';

type WeirdForm = {
  name: string,
  age: number,
  worksAtCompany: boolean,
  errors: {
    name: boolean,
    age: boolean
  }
}

const formInitialState: WeirdForm = {
  name: '',
  age: 0,
  worksAtCompany: false,
  errors: {
    name: false,
    age: false
  }
}

const VALID_NAME_FORMAT = /^[a-zA-Z][a-zA-Z ]*$/
const VALID_AGE = 18

const App: FC = (): ReactElement => {
  const [form, setForm] = useState<WeirdForm>(formInitialState);
  const [showData, setShowData] = useState(false);

  const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }) as WeirdForm)
  }

  const submitForm = (): void => {
    if (!form.name.trim() || !VALID_NAME_FORMAT.test(form.name))
      return setForm(state => ({
        ...state,
        errors: { ...formInitialState.errors, name: true }
      }))

    if (form.age < VALID_AGE)
      return setForm(state => ({
        ...state,
        errors: { ...formInitialState.errors, age: true }
      }))

    setForm(state => ({
      ...state,
      errors: formInitialState.errors
    }))
    
    setShowData(true);
  }

  const resetFields = (): void => {
    setForm(formInitialState);
    setShowData(false);
  }

  return (
    <div>
      <form role='form'>
        <label htmlFor='name'>Name</label>
        <br />
        <input
          placeholder='name'
          value={form.name}
          name='name'
          id='name'
          type={'text'}
          onChange={handleChangeForm}
        />
        <br />
        {form.errors.name && <b role={'alertdialog'}>Ingrese un nombre valido</b>}
        <br />
        <label htmlFor='age'>Age</label>
        <br />
        <input
          placeholder='age'
          value={form.age}
          name='age'
          id='age'
          type={'number'}
          min={0}
          onChange={handleChangeForm}
        />
        <br />
        {form.errors.age && <b role={'alertdialog'}>Debe ser mayor de edad</b>}
        <br />
        <input
          checked={form.worksAtCompany}
          type={'checkbox'}
          role={'checkbox'}
          id='worksAtCompany'
          name='worksAtCompany'
          onChange={handleChangeForm}
        />
        <label htmlFor='worksAtCompany'>Works at Dedica</label>
        <br />
        <br />
      </form>
      <button onClick={submitForm}>Submit</button>
      <button onClick={resetFields}>Reset</button>
      <br />
      <br />

      {showData &&
        <ul role={'list'}>
          <li>name: {form.name}</li>
          <li>age: {form.age}</li>
          <li>works at company: {form.worksAtCompany ? 'yes' : 'no'}</li>
        </ul>
      }
    </div>
  )
}

export default App
