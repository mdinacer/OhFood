import {Box, Button, Container, Paper, Step, StepLabel, Stepper, Typography,} from "@mui/material";
import {useState} from "react";
import CheckoutAddressForm from "./AddressForm";
import Review from "./Review";
import agent from "../../app/api/agent";
import {LoadingButton} from "@mui/lab";
import {useAppDispatch} from "../../app/store/configureStore";
import "./CheckoutPage.scss";
import {clearBasket} from "../../app/slices/basketSlice";
import {Link} from "react-router-dom";
import {ShippingAddress} from "../../app/models/shippingAddress";

const steps = ["Address", "Review", "Receipt"];

export default function CheckoutPage() {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);
    const [saveDefault, setSaveDefault] = useState(false);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    function onItemSelected(item: ShippingAddress | null) {
        setSelectedAddress(item)
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <CheckoutAddressForm onItemSelected={onItemSelected} setSaveDefault={(value => setSaveDefault(value))}/>;
            case 1:
                return <Review/>;
            case 2:
                return (
                    <Box
                        width={"100%"}
                        height={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Typography textAlign={"center"}>
                            You order has been sent, You will be notified on confirmation and
                            delivery.
                        </Typography>
                    </Box>
                );

            default:
                throw new Error("Unknown step");
        }
    }


    async function submitOrder() {
        setLoading(true);

        try {
            const orderNumber = await agent.Orders.create({
                saveAddress: saveDefault,
                shippingAddress: selectedAddress,
            });
            setOrderNumber(orderNumber);
            setActiveStep(activeStep + 1);
            dispatch(clearBasket());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleNext = async () => {
        if (activeStep === 1) {
            await submitOrder();
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function submitDisabled(): boolean {
        return selectedAddress === null;
    }

    return (
        <Box
            className={"payment"}
            sx={{pb: {xs: 10, md: 1}, pt: {xs: 1, md: 7}}}
        >
            <Container>
                <Paper
                    variant="outlined"
                    sx={{
                        maxWidth: 800,
                        my: {xs: 1, md: 6},
                        mx: "auto",
                        p: {xs: 2, md: 3},
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
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
                                    Your order number is #{orderNumber}. We have emailed your
                                    order confirmation, and will not send you an update when
                                    your order has shipped!
                                </Typography>
                            </>
                        ) : (
                            <Box>
                                {getStepContent(activeStep)}
                                <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                            Back
                                        </Button>
                                    )}
                                    {activeStep !== 2 ? (
                                        <LoadingButton
                                            loading={loading}
                                            disabled={submitDisabled()}
                                            variant="contained"
                                            onClick={() => handleNext()}
                                            sx={{mt: 3, ml: 1}}
                                        >
                                            {activeStep === 1 ? "Place order" : "Next"}
                                        </LoadingButton>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            sx={{mt: 3, ml: 1}}
                                            component={Link}
                                            to={"/"}
                                        >
                                            Home
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </>
                </Paper>
            </Container>
        </Box>
    );
}
