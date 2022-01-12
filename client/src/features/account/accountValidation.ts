import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
    user: yup.object().shape({
        username: yup.string().required('Full name is required'),
        email: yup.string().email().required('Email is required'),
        password: yup.string()
            .required('Password is required')
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                "Password must at least 8 characters long and must contain: " +
                "one uppercase,one lowercase and one alphanumeric character."),

    }),

    profile: yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phone1: yup.string().required(),
        phone2: yup.string(),
    }),


    passwordConfirmation: yup.string().oneOf([yup.ref('user.password'), null], 'Passwords must match'),


});