import * as Yup from 'yup'

const phoneRegExp = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i

export const FORM_VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Min value is 6')
    .max(32, 'Max value is 32')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Min value is 2')
    .max(30, 'Max value is 30')
    .required('Required'),
  surname: Yup.string()
    .min(2, 'Min value is 2')
    .max(30, 'Max value is 30')
    .required('Required'),
  birthDate: Yup.date()
    .min('1900', 'Min year is 1900')
    .max(new Date(), 'You can not be born in the future'),
  address: Yup.string()
  .min(8, 'Min value is 8')
  .max(64, 'Max value is 64'),
  phone: Yup.string()
  .matches(phoneRegExp, 'Phone number is not valid')
  .required('Required'),
})

export const INITIAL_FORM_STATE = {
  email: '',
  password: '',
  phone: '',
  name: '',
  surname: '',
  birthDate: '',
  address: '',
}
