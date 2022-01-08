import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Box, Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Edit, GpsFixed } from "@mui/icons-material";
import { ShippingAddress } from "../../app/models/shippingAddress";
import { LoadingButton } from "@mui/lab";

export default function ProfileAddress() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [addressesLoaded, setAddressesLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    agent.Profile.fetchAddresses()
      .then((response) => {
        setAddresses(response);
        setAddressesLoaded(true)
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));

    return () => setAddresses([]);
  }, []);

  const setDefaultAddress = (id: number) => {
    setBusy(true)
    agent.Profile.setDefaultAddress(id)
      .then(_ => {
        const newAddresses = addresses.map(a => ({ ...a, isDefault: a.id === id }))
        setAddresses(newAddresses)
      })
      .catch(error => console.log(error))
      .finally(() => setBusy(false));
  }

  const showMessage = (message: string = "Loading") => (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography variant={"caption"}>{message}</Typography>
    </Box>
  );

  if (loading) return showMessage("Loading Shipping Addresses");
  if (!loading && !addressesLoaded) return showMessage("Shipping address not set");

  return (
    <Box>
      <Stack my={3} direction="row" justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h5" component="h2" >Delivery Addresses</Typography>
        {addresses.length < 3 && (
          <Button startIcon={<Edit />} variant="text" color="inherit" size="small">
            New Address
          </Button>
        )}
      </Stack>
      <Grid container spacing={3}>
        {addresses.map((address) =>
          addressesLoaded ? (
            <Grid md={4} xs={12} key={address.id} item>
              <Paper sx={{ px: 3, pb: 1, pt: 3, height: "100%" }}>
                <Typography variant="caption">Home</Typography>
                <Typography variant="body2">{address.fullName} {address.isDefault && (<Typography variant="caption">(Default)</Typography>)}</Typography>
                <Typography variant="subtitle1">{address.address1}</Typography>
                <Typography variant="body2">{address.city}</Typography>
                <Divider sx={{ my: 1 }} />
                <LoadingButton disabled={address.isDefault} loading={busy} onClick={() => setDefaultAddress(address.id)} startIcon={<GpsFixed />} variant="text" color="inherit" size="small">
                  Set Default
                </LoadingButton>
              </Paper>
            </Grid>
          ) :
            (
              <Box>
                <Typography>Your Address Book is Empty</Typography>
              </Box>
            ))}
      </Grid>

    </Box>
  );
}
