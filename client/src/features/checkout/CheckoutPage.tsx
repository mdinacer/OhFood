import {Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import AddressForm from "./AddressForm";
import Review from "./Review";
import {yupResolver} from '@hookform/resolvers/yup';
import {AddressFormValidation} from "./checkoutValidation";
import agent from "../../app/api/agent";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch} from "../../app/store/configureStore";
import "./CheckoutPage.scss";
import {clearBasket} from "../../app/slices/basketSlice";


const steps = ['Address', 'Review', "Receipt"];

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    //const {basket} = useAppSelector(state => state.basket);

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm/>;
            case 1:
                return <Review/>;

            default:
                throw new Error('Unknown step');
        }
    }


    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(AddressFormValidation)
    });

    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {
                if (response) {
                    methods.reset({...methods.getValues(), ...response, saveAddress: false})
                }
            })
    }, [methods])

    async function submitOrder(data: FieldValues) {
        setLoading(true);
        const {saveAddress, ...shippingAddress} = data;

        try {
            const orderNumber = await agent.Orders.create({saveAddress, shippingAddress});
            setOrderNumber(orderNumber);
            //setActiveStep(activeStep + 1);
            dispatch(clearBasket());


        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    const handleNext = async (data: FieldValues) => {
        if (activeStep === 1) {
            await submitOrder(data);
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function submitDisabled(): boolean {
        return !methods.formState.isValid
    }

    return (
        <Box className={"payment"}>
            <Container sx={{pt: 7,}}>
                <FormProvider {...methods}>
                    <Paper variant="outlined"
                           sx={{
                               maxWidth: 800,
                               my: {xs: 3, md: 6},
                               mx: "auto",
                               p: {xs: 2, md: 3},
                               backgroundColor: "rgba(0,0,0,0.5)"
                           }}>
                        <Typography component="h1" variant="h4" align="center">
                            Order
                        </Typography>
                        <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <>
                            {activeStep === steps.length ? (
                                <>
                                    <Typography variant="subtitle1">
                                        Your order number is #{orderNumber}. We have emailed your order
                                        confirmation, and will not send you an update when your order has
                                        shipped!
                                    </Typography>
                                </>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                                Back
                                            </Button>
                                        )}
                                        <LoadingButton
                                            loading={loading}
                                            disabled={submitDisabled()}
                                            variant="contained"
                                            type='submit'
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </LoadingButton>
                                    </Box>
                                </form>
                            )}
                        </>
                    </Paper>
                </FormProvider>
            </Container>
        </Box>

    );
}
