import * as yup from 'yup';

export const categoryValidation = yup.object({
    name: yup.string().required(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
})