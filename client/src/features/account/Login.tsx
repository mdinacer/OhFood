import {Avatar, Box, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import {signInUser} from "../../app/slices/accountSlice";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/store/configureStore";
import {useEffect} from "react";
import {LoadingButton} from "@mui/lab";
import {LockOutlined} from '@mui/icons-material';
import "./Account.scss";

export default function Login() {
    const {state}: any | null = useLocation();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        formState: {isSubmitting, errors, isValid},
    } = useForm({mode: "all"});

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(signInUser(data));
            const from = state?.from?.pathname || "/";
            navigate(from);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const login = state?.login;
        if (login) {
            setValue("username", login.username);
            setValue("password", login.password);
        }
    }, [state?.login, setValue]);

    return (
        <Box className={"account"}>
            <Container component={Paper} maxWidth="sm" className={"login-form"}
                       sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4}}>
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" sx={{color:"white"}} variant="h5">
                   Connection
                </Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        autoComplete={"off"}
                        autoFocus
                        {...register('username', {required: 'Username is required'})}
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        {...register('password', {required: 'Password is required'})}
                        error={!!errors.password}
                        helperText={errors?.password?.message}
                    />
                    <LoadingButton disableElevation={true}
                        disabled={!isValid}
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Login
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <Link to='/register' >
                                {"Create Account."}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}