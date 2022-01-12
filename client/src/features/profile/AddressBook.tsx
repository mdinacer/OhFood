import {LoadingButton} from "@mui/lab";
import {
    Backdrop,
    Box,
    Button,
    Container,
    CssBaseline,
    Divider,
    Fade,
    Grid,
    IconButton,
    Modal,
    Paper,
    Stack,
    ThemeProvider,
    Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import agent from "../../app/api/agent";
import AppDialog from "../../app/components/AppDialog";
import {LightTheme} from "../../app/layout/App";
import {ShippingAddress} from "../../app/models/shippingAddress";
import AddressForm from "./AddressForm";
import {Close} from "@mui/icons-material";
import {Link} from "react-router-dom";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 900,
    minWidth: 300,
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    py: 2,
    overflow: "auto",
    maxHeight: "90vh",
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


    const toggleAddressForm = (value: boolean) => setOpen({...open, addressForm: value});
    const toggleDeleteDialog = (value: boolean) => setOpen({...open, deleteDialog: value});


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
            newItems[index] = {...data};
            setAddresses(newItems);
            setBusy(false);
        }
    }

    const setDefaultAddress = (id: number) => {
        setBusy(true)
        agent.Profile.setDefaultAddress(id)
            .then(_ => {
                const newAddresses = addresses.map(a => ({...a, isDefault: a.id === id}))
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
        <>
            <ThemeProvider theme={LightTheme}>
                <CssBaseline/>
                <Box sx={{
                    pt: {xs: 0, md: "60px"},
                    pb: {md: 0, xs: "60px"},
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#EEEEEE",
                    minHeight: "100Vh",
                    color: "black",
                }}>
                    <Container sx={{height: "100%"}}>
                        <Stack direction={"row"} sx={{width: "100%", py: 5}} alignItems={"center"}
                               justifyContent={"space-between"}>
                            <Typography variant={"h5"} component={"h1"}> Delivery Addresses</Typography>
                            <Button size={"small"} variant={"text"} color={"inherit"} component={Link} to={"/profile"}>
                                Back to Profile
                            </Button>
                        </Stack>

                        <Grid container spacing={3}>
                            {addresses.map(address => (
                                <Grid key={address.id} item xs={12} md={4}>
                                    <Paper elevation={address.isDefault ? 1 : 0}
                                           sx={{p: 3, pb: 1, borderRadius: 4, position: "relative", height: "100%"}}>
                                        <IconButton
                                            size={"small"}
                                            disabled={address.isDefault}
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                right: 0,
                                                m: 1,
                                            }}
                                            onClick={() => {
                                                setSelectedAddress(address);
                                                toggleDeleteDialog(true);
                                            }}
                                        >
                                            <Close/>
                                        </IconButton>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            justifyContent: "center"
                                        }}>
                                            <Typography gutterBottom sx={{flex: "0 1 auto", textTransform: "uppercase"}}
                                                        variant={"caption"}>{address.title} {address.isDefault && "(Default)"}</Typography>
                                            <Typography sx={{flex: "0 1 auto"}}
                                                        variant={"body2"}>{address.fullName}</Typography>
                                            <Typography sx={{flex: "1 1 auto"}}
                                                        variant={"subtitle1"}>{address.address1}</Typography>
                                            <Typography sx={{flex: "0 1 auto"}}
                                                        variant={"body2"}>{address.town ?? address.suburb}</Typography>

                                            <Divider flexItem sx={{my: 1}}/>

                                            <Stack direction={"row"} justifyContent={"space-evenly"}
                                                   alignItems={"center"} width={"100%"}>
                                                <Button
                                                    onClick={() => {
                                                        setSelectedAddress(address);
                                                        toggleAddressForm(true);
                                                    }}
                                                    color={"inherit"} fullWidth={address.isDefault} variant={"text"}
                                                    size={"small"}>
                                                    Edit
                                                </Button>
                                                {!address.isDefault && (
                                                    <LoadingButton loading={busy}
                                                                   onClick={() => setDefaultAddress(address.id)}
                                                                   color={"inherit"} variant={"text"} size={"small"}>
                                                        Set Default
                                                    </LoadingButton>
                                                )}
                                            </Stack>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}

                            {addresses.length < 3 && (
                                <Grid item xs={12} md={4}>
                                    <Box component={Paper} height={"100%"} minHeight={"140px"} justifyContent={"center"}
                                         alignItems={"center"}
                                         display={"flex"} elevation={0} sx={{p: 3, borderRadius: 4}}>
                                        <Button variant={"text"} color={"inherit"} onClick={() => {
                                            setSelectedAddress(null);
                                            toggleAddressForm(true);
                                        }}>
                                            New Address
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </Box>

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
                            <AddressForm onSubmit={onSubmitForm} onCancel={toggleAddressForm}
                                         address={selectedAddress}/>

                        </Box>
                    </Fade>
                </Modal>

                <AppDialog
                    open={open.deleteDialog}
                    title="Delete Address"
                    onClose={handleDialogOnClose}
                    body={"Are you sure you want to delete this element?"}
                />
            </ThemeProvider>

        </>

    );
}
