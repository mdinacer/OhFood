import * as yup from 'yup';

export const AddressFormValidation = yup.object({
    shippingAddress: yup.string().required()

})
