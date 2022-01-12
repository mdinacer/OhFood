import Typography from '@mui/material/Typography';
import {
    Backdrop,
    Box, Button,
    Checkbox,
    Container,
    Fade,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Modal, Paper,
    Select,
    Stack
} from "@mui/material";
import {useEffect, useState} from "react";
import {ShippingAddress} from "../../app/models/shippingAddress";
import agent from "../../app/api/agent";
import {default as ModalAddressForm} from "../profile/AddressForm";

interface Props {
    onItemSelected: (item: ShippingAddress | null) => void;
    setSaveDefault: (value: boolean) => void;
}

export default function CheckoutAddressForm({onItemSelected, setSaveDefault}: Props) {
    const [addresses, setAddresses] = useState<ShippingAddress[]>([])
    const [selectedAddressTitle, setSelectedAddressTitle] = useState("")
    const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null)
    const [loading, setLoading] = useState(false)
    const [addressesLoaded, setAddressesLoaded] = useState(false)
    const [busy, setBusy] = useState(false)
    const [open, setOpen] = useState(false);

    useEffect(() => {
       if(!addressesLoaded){
           setLoading(true);
           agent.Profile.fetchAddresses()
               .then((response: ShippingAddress[]) => {
                   setAddressesLoaded(true)
                   setAddresses(response);
               })
               .catch((e) => console.log(e))
               .finally(() => setLoading(false));
       }


    }, [addressesLoaded]);

    function handleSelectAddress(value: string) {
        setSelectedAddressTitle(value)
        const item = addresses.find(a => a.title === value);
        setSelectedAddress(item !== undefined ? item : null);
        onItemSelected(item !== undefined ? item : null);

    }

    const handleChange = (event: any) => {
        setSaveDefault(event.target.checked);
    };

    const onSubmitForm = (data: ShippingAddress) => {
        if (selectedAddress) {
            setBusy(true);
            const newItems = {...addresses, data}
            setAddresses(newItems);
            handleSelectAddress(data.title)
            setBusy(false);
        }
    }

    return (
        <Box maxWidth={800} sx={{mx: "auto"}}>
           <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
               <Typography variant="h6" sx={{mb: 3}}>
                   Shipping address
               </Typography>
               {addressesLoaded && addresses.length < 3 && (
                   <Button onClick={() => setOpen(true)}>
                       Add Address
                   </Button>
               )}
           </Stack>
            <Container>
                {addressesLoaded && addresses.length > 0 && (
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="addresses-label">Addresses</InputLabel>
                            <Select
                                labelId="addresses-label"
                                id="addresses-select"
                                value={selectedAddressTitle}
                                label="Shipping Address"
                                onChange={({target}) => {
                                    handleSelectAddress(target.value)
                                }}
                                name={"shippingAddress"}
                            >
                                {addresses.map(address => (
                                    <MenuItem key={address.id}
                                              value={address.title}>
                                        <Box sx={{width: "100%"}}>
                                            <Typography sx={{textTransform: "uppercase"}}
                                                        variant={"subtitle1"}>{address.title}</Typography>
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>

                                                </Grid>


                                                <Grid item xs={6}>
                                                    <Stack>
                                                        <Typography variant={"caption"}>Full Name</Typography>
                                                        <Typography variant={"caption"}>{address.fullName}</Typography>
                                                    </Stack>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Stack>
                                                        <Typography variant={"caption"}>Address</Typography>
                                                        <Typography variant={"caption"}>{address.address1}</Typography>
                                                    </Stack>
                                                </Grid>


                                            </Grid>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedAddress && !selectedAddress.isDefault && (
                            <FormGroup>
                                <FormControlLabel onChange={handleChange} control={<Checkbox />}
                                                  label="Set Default"/>
                            </FormGroup>
                        )}
                    </Box>
                )}
            </Container>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 900,
                        minWidth: 300,

                        borderRadius: 3,
                        boxShadow: 24,
                        py: 2,
                        overflow: "auto",
                        maxHeight: "90vh",
                    }}>
                        <ModalAddressForm onSubmit={onSubmitForm} onCancel={() => setOpen(false)} />

                    </Paper>
                </Fade>
            </Modal>

        </Box>
    );
}
