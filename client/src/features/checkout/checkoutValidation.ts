import * as yup from 'yup';

export const AddressFormValidation = yup.object({
    fullName: yup.string().required('Champ obligatoir'),
    address1: yup.string().required('Champ obligatoir'),
    city: yup.string().required(),

})
