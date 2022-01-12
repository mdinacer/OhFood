import {Avatar, Box, Container, Grid, Paper, Typography} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import {LockOutlined} from '@mui/icons-material';
import "./Account.scss";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {registerValidationSchema} from "./accountValidation";
import AppTextInput from "../../app/components/AppTextInput";
import {toast} from "react-toastify";
import agent from "../../app/api/agent";

export default function Register() {
    const navigate = useNavigate();
    const {handleSubmit, control, formState: {isValid, isSubmitting}} = useForm({
        mode: 'all',
        resolver: yupResolver(registerValidationSchema),
    });

    function handleOnSubmit(data: FieldValues) {
        const {passwordConfirmation, user, profile} = data;


        const userItem = {
            ...user,
            "profile.firstName": profile.firstName,
            "profile.lastName": profile.lastName,
            "profile.phone1": profile.phone1,
            "profile.phone2": profile.phone2,
        };

        console.log(userItem)
        agent.Account.register(userItem)
            .then(() => {
                toast.success('Registration successful - you can now login');
                navigate('/login');
            })
            .catch(error => console.log("error from here", error))
    }


    return (
        <Box className={"account"}>

            <Container className={"login-form"} component={Paper} maxWidth="sm"
                       sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" sx={{color: "white"}}>
                    Create Account
                </Typography>
                <Box component={"form"} onSubmit={handleSubmit(handleOnSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AppTextInput control={control} name='user.username' label='User name'/>
                        </Grid>

                        <Grid item xs={12}>
                            <AppTextInput control={control} name='user.email' label='Email'/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <AppTextInput control={control} name='profile.firstName' label='First name'/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <AppTextInput control={control} name='profile.lastName' label='Last name'/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <AppTextInput control={control} name='profile.phone1' label='Mobile'/>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <AppTextInput control={control} name='profile.phone2' label='Mobile 2nd'/>
                        </Grid>


                        <Grid item xs={12}>
                            <AppTextInput type={"password"} control={control} name='user.password' label='Password'/>
                        </Grid>
                        <Grid item xs={12}>
                            <AppTextInput type={"password"} control={control} name='passwordConfirmation'
                                          label='Confirm Password'/>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <LoadingButton
                                disabled={!isValid}
                                loading={isSubmitting}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Register
                            </LoadingButton>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}