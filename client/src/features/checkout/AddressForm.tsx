import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AppTextInput control={control} name="fullName" label="Full Name" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            name="address1"
            label="Address line 1"
            control={control}
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            name="address2"
            label="Address line 2"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="city" label="City" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            name="state"
            label="State/Province/Region"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput
            name="zipCode"
            label="Zip / Postal code"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="country" label="Country" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="Save as default address"
            control={control}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
