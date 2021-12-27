import * as yup from 'yup';

export const AddressFormValidation = yup.object({
    fullName: yup.string().required('Please enter your name'),
    address1: yup.string().required('Please enter your address'),
    city: yup.string().required(),

})
