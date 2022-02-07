import * as yup from 'yup';

export const productValidation = yup.object({
    name: yup.string().required(),
    category: yup.string().required(),
    price: yup.number().required().moreThan(0),
    description: yup.string(),
    pictureUrl: yup.string(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
})