import * as Yup from 'yup'

export const INITIAL_FORM_STATE = {
  email: '',
  password: '',
}

export const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Min value is 6')
    .max(32, 'Max value is 32')
    .required('Required'),
})