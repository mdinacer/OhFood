import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { ShippingAddress } from "../../app/models/shippingAddress";

interface Props {
    address?: ShippingAddress | null;
    onCancel: (value: boolean) => void;
    onSubmit: (data: any) => void;
}

export default function AddressForm({ address, onCancel, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { isSubmitting, errors, isValid },
    } = useForm({ mode: "all" });

    useEffect(() => {
        if (address) {
            setValue("fullName", address.fullName);
            setValue("address1", address.address1);
            setValue("city", address.city);
        }
    }, [address, setValue])

    async function submitForm(data: FieldValues) {
        try {
            const item = { ...data, id: address ? address.id : 0, isDefault: false }
            if (address) {
                await agent.Profile.updateAddress(item);
            } else {
                await agent.Profile.createAddress(item);
            }
            onSubmit(item);
            reset();
        } catch (error) {
            console.log(error);
        } finally {
            onCancel(false);
        }
    }

    const handleCancel = () => {
        reset();
        onCancel(false);
    }

    return (
        <Container>
            <Box
                component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}
            >
                <TextField
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    autoComplete={"off"}
                    {...register('fullName', { required: 'Full Name is required' })}
                    error={!!errors.fullName}
                    helperText={errors?.fullName?.message}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="Address"
                    autoComplete={"off"}
                    {...register('address1', { required: 'Address is required' })}
                    error={!!errors.address1}
                    helperText={errors?.address1?.message}
                />
                <TextField
                    margin="normal"
                    fullWidth
                    label="City"
                    autoComplete={"off"}
                    {...register('city', { required: 'City is required' })}
                    error={!!errors.city}
                    helperText={errors?.city?.message}
                />

                <LoadingButton
                    loading={isSubmitting}
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    disableElevation
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Save
                </LoadingButton>
                <Button fullWidth onClick={handleCancel} color="inherit"
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Container>
    )
}