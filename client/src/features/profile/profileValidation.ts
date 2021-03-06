import * as yup from 'yup';

export const profileValidationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone1: yup.string().required(),
    phone2: yup.string(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
})

export const addressValidationSchema = yup.object({
    fullName: yup.string().required(),
    title: yup.string().required(),
    address1: yup.string().required(),

})