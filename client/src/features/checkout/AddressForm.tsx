import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useFormContext} from 'react-hook-form';
import AppTextInput from '../../app/components/AppTextInput';
import AppCheckbox from '../../app/components/AppCheckbox';
import {Box} from "@mui/material";

export default function AddressForm() {
    const {control, formState} = useFormContext();
    return (
        <Box maxWidth={800} sx={{mx: "auto"}}>
            <Typography variant="h6" sx={{mb: 3}}>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='fullName' label='Full name'/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <AppTextInput control={control} name='address1' label='Address'/>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <AppTextInput control={control} name='city' label='City'/>
                </Grid>

                <Grid item xs={12}>
                    <AppCheckbox
                        disabled={!formState.isDirty}
                        name='saveAddress'
                        label='Save this as the default address'
                        control={control}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}