import { Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Backdrop,
    Box,
    Button,
    Container,
    CssBaseline,
    Divider,
    Fade,
    Grid,
    Modal,
    Paper,
    Stack,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import AppDialog from "../../app/components/AppDialog";
import { LightTheme } from "../../app/layout/App";
import { ShippingAddress } from "../../app/models/shippingAddress";
import AddressForm from "./AddressForm";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    minWidth: 300,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    py: 2,
};

export default function AddressBook() {
    const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
    const [loading, setLoading] = useState(false);
    const [busy, setBusy] = useState(false);
    const [open, setOpen] = useState({
        addressForm: false,
        deleteDialog: false
    });
    const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);

    useEffect(() => {
        setLoading(true);
        agent.Profile.fetchAddresses()
            .then((response) => {
                setAddresses(response);
            })
            .catch((e) => console.log(e))
            .finally(() => setLoading(false));

        return () => setAddresses([]);
    }, []);


    const toggleAddressForm = (value: boolean) => setOpen({ ...open, addressForm: value });
    const toggleDeleteDialog = (value: boolean) => setOpen({ ...open, deleteDialog: value });



    function handleDialogOnClose(value: boolean) {
        toggleDeleteDialog(false);
        if (value && selectedAddress) {
            console.log("Deleting Address");
            handleDeleteAddress(selectedAddress.id);
        }

    }

    const handleDeleteAddress = (id: number) => {
        setBusy(true);
        agent.Profile.deleteAddress(id)
            .then(_ => {
                setAddresses(addresses.filter(a => a.id !== id));
            })
            .catch(e => console.log(e))
            .finally(() => {
                setSelectedAddress(null);
                setBusy(false);
            });
    }

    const onSubmitForm = (data: any) => {
        if (selectedAddress) {
            setBusy(true);
            const index = addresses.indexOf(selectedAddress);
            const newItems = addresses;
            newItems[index] = { ...data };
            setAddresses(newItems);
            setBusy(false);
        }
    }

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

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Box
                sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#EEEEEE",
                    minHeight: "100Vh",
                    color: "black",
                }}
            >
                <Container sx={{ py: { md: 5, xs: 2 }, pt: { md: 10, xs: 2 } }}>
                    <Stack sx={{ width: "100%", pb: 4 }} display={"flex"} flexDirection="row" alignItems="center" justifyContent="space-between">
                        <Typography
                            variant={"h4"}
                            component={"h1"}
                            sx={{ textTransform: "uppercase" }}
                        >
                            Address Book
                        </Typography>

                        <Button variant="text" color="inherit" size="small" component={Link} to="/profile">
                            Back to profile
                        </Button>
                    </Stack>
                    {loading && addresses.length === 0 && showMessage("Loading Addresses")}
                    {!loading && addresses.length === 0 && showMessage("Your address book is empty")}

                    {addresses.length > 0 && (
                        <Container>
                            <Grid container spacing={2}>
                                {addresses.map((address) => (
                                    <Grid key={address.id} item md={4} xs={12}>
                                        <Paper sx={{ py: 2, height: "100%" }}>
                                            <Container sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                height: "100%"

                                            }}>
                                                <Stack sx={{ flex: "0 1 auto" }}>
                                                    <Typography variant={"caption"}>Name</Typography>
                                                    <Typography variant={"body2"} gutterBottom>{address.fullName}</Typography>
                                                </Stack>
                                                <Stack sx={{ flex: "1 1 auto", height: "100%" }}>
                                                    <Typography variant={"caption"}>Address</Typography>
                                                    <Typography variant={"subtitle1"} gutterBottom>{address.address1}</Typography>
                                                </Stack>
                                                <Stack sx={{ flex: "0 1 auto" }}>
                                                    <Typography variant={"caption"}>City</Typography>
                                                    <Typography variant={"body1"} gutterBottom>{address.city}</Typography>
                                                </Stack>
                                                <Divider />
                                                <Stack direction="row" sx={{ flex: "0 1 auto" }} justifyContent={"space-between"}>
                                                    <LoadingButton loading={busy} disabled={address.isDefault} size="small" color="inherit" variant="text"
                                                        onClick={() => setDefaultAddress(address.id)}>Set Default</LoadingButton>
                                                    <LoadingButton loading={busy} startIcon={<Edit />} size="small" color="inherit" variant="text" onClick={() => {
                                                        setSelectedAddress(address);
                                                        toggleAddressForm(true);
                                                    }}>Edit</LoadingButton>
                                                    <LoadingButton loading={busy} disabled={address.isDefault}
                                                        startIcon={<Delete />} size="small"
                                                        color="error"
                                                        variant="text"
                                                        onClick={() => {
                                                            setSelectedAddress(address);
                                                            toggleDeleteDialog(true);
                                                        }}>Delete</LoadingButton>
                                                </Stack>

                                            </Container>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    )}
                </Container>

                <>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open.addressForm}
                        onClose={() => toggleAddressForm(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open.addressForm}>
                            <Box sx={style}>
                                <AddressForm onSubmit={onSubmitForm} onCancel={toggleAddressForm} address={selectedAddress} />
                            </Box>
                        </Fade>
                    </Modal>

                    <AppDialog
                        open={open.deleteDialog}
                        title="Delete Address"
                        onClose={handleDialogOnClose}
                        body={"Are you sure you want to delete this element?"}
                    />
                </>
            </Box>
        </ThemeProvider >
    );
}
