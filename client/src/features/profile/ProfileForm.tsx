import {Box, Button, Grid} from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import AppDropzone from "../../app/components/AppDropzone";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {FieldValues, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {profileValidationSchema} from "./profileValidation";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoadingButton} from "@mui/lab";
import {Link, useNavigate} from "react-router-dom";
import agent from "../../app/api/agent";
import {setProfile} from "../../app/slices/accountSlice";


export default function ProfileForm() {
    const {control, reset, handleSubmit, watch, formState} = useForm({
        mode: 'all',
        resolver: yupResolver(profileValidationSchema),
    });

    const {isDirty, isValid} = formState;
    const {profile} = useAppSelector(state => state.account);
    const navigate = useNavigate();
    const watchFile = watch('file', null);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (profile && !watchFile && !isDirty) reset({...profile, phone2: profile.phone2 ?? ""});
        return () => {
            if (watchFile) URL.revokeObjectURL(watchFile.preview);
        }
    }, [profile, reset, watchFile, isDirty]);


    async function handleSubmitData(data: FieldValues) {

        try {
            setIsSubmitting(true);
            const value = await agent.Profile.updateProfile(data);
            if(value){
                dispatch(setProfile(value));
                navigate("/profile");
            }
            console.log(value)
        } catch (error) {
            console.log(error)
        }finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Box>
            <div>Submitting: {isSubmitting}</div>
            <form onSubmit={handleSubmit(handleSubmitData)}>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <AppTextInput control={control} name='firstName' label='First Name'/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <AppTextInput control={control} name='lastName' label='Last Name'/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <AppTextInput control={control} name='phone1' label='Mobile'/>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <AppTextInput control={control} name='phone2' label='Mobile'/>
                    </Grid>

                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    width: "100%",
                                }}>
                                    <AppDropzone control={control} name='file'/>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "100%"
                                }}>
                                    {watchFile ? (
                                        <Box component={"img"} sx={{borderRadius: 3}} src={watchFile.preview}
                                             alt='preview'
                                             style={{maxHeight: 200}}/>
                                    ) : (
                                        <Box component={"img"}
                                             sx={{borderRadius: 3, objectFit: "cover", objectPosition: "center"}}
                                             src={profile?.pictureUrl} alt={profile?.firstName}
                                             style={{maxHeight: 200}}/>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
                <Box display='flex' alignItems={"center"}
                     sx={{mt: 3, justifyContent: {xs: "space-evenly", md: "flex-end"}}}>
                    <Button sx={{mx: 1, width: {xs: "100%", md: "95px"}}} component={Link} to={"/profile"}
                            variant='outlined' color='inherit'>Cancel</Button>
                    <LoadingButton
                        type='submit'
                        loading={isSubmitting}
                        disabled={!isValid}
                        onClick={handleSubmit(handleSubmitData)}
                        sx={{color: "#FFF", fontWeight: "bold", width: {xs: "100%", md: "95px"}}}
                        variant='contained' disableElevation
                        color='primary'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
};
