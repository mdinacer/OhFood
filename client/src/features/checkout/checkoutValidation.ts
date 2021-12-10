import * as yup from "yup"

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is required"),
        address1: yup.string().required("Address is required"),
        address2: yup.string(),
        city: yup.string().required(),
        state: yup.string().required(),
        zipCode: yup.string().required(),
        country: yup.string().required(),
    }),
    yup.object(),

    yup.object({
        nameOnCard: yup.string().required("Full name is required"),
    }),

];