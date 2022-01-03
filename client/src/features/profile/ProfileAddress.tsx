import {useEffect, useState} from "react";
import {ShippingAddress} from "../../app/models/order";
import agent from "../../app/api/agent";
import {Box, Button, Container, Typography} from "@mui/material";
import {Edit} from "@mui/icons-material";

export default function ProfileAddress() {
    const [address, setAddress] = useState<ShippingAddress | null>(null)
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        if (!address) {
            agent.Account.fetchAddress()
                .then(response => {
                    setAddress(response);
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false);
                    console.log("finished loading address")
                })
        }
    }, [address])

    if (loading && !address) return <Typography>Loading default Shipping Address</Typography>
    if (!loading && !address) return <Typography>Shipping address not set</Typography>

    return (
        <Box>
            {address && (
                <Container >
                    <Typography variant={"h5"} component={"h2"} gutterBottom>Delivery Address</Typography>
                    <Typography variant={"caption"}>Name</Typography>
                    <Typography variant={"subtitle1"} gutterBottom>{address.fullName}</Typography>
                    <Typography variant={"caption"}>Address</Typography>
                    <Typography variant={"body2"}>{address.address1} - {address.city}</Typography>
                    <Button size={"small"} color={"inherit"} variant={"text"} startIcon={<Edit/>}>Edit</Button>
                </Container>
            )}
        </Box>
    )
}