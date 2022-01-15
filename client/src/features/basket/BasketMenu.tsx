import {useAppSelector} from "../../app/store/configureStore";
import {Box, Button, Container, Divider, IconButton, List, ListItem, Stack, Typography} from "@mui/material";
import React from "react";
import {currencyFormat} from "../../app/util/util";
import {Close, ShoppingCartCheckout} from "@mui/icons-material";
import {Link} from "react-router-dom";
import BasketMenuItem from "./BasketMenuItem";

interface Props {
    onClose: (value: boolean) => void;
}

export default function BasketMenu({onClose}: Props) {
    const {basket, status} = useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    //const deliveryFee = subtotal > 10000 ? 0 : 500;


    return (
        <Box sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",

        }}>

            <Stack sx={{py: 1, px: 2, flex: "0 1 auto"}} direction={"row"}
                   justifyContent={"space-between"} alignItems={"center"}>
                <IconButton onClick={() => onClose(false)} color={"inherit"}>
                    <Close/>
                </IconButton>
                <Typography variant={"h6"}>Order Bag</Typography>
            </Stack>
            <Divider flexItem sx={{my:1}}/>
            <Box sx={{flex: "1 1 auto", overflow: "auto",}}>
                {basket && basket.items.length > 0 ?
                    (
                        <List>
                            {basket.items.map(item => (
                                <ListItem key={item.productId} sx={{}}>
                                    <BasketMenuItem item={item} status={status}/>
                                </ListItem>
                            ))}
                        </List>
                    )
                    : (
                        <Box sx={{minWidth: {xs: "80vw", md: 500}}} height={"100%"} display={"flex"}
                             alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                            <Typography variant='h6'>Your bag is empty</Typography>
                        </Box>
                    )}
            </Box>

            <Divider flexItem sx={{my:1}}/>
            <Container sx={{flex: "0 1 auto", py: 3}}>
                <Typography variant={"caption"}>Shipping costs are calculated at checkout</Typography>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant={"caption"}>Total</Typography>
                    <Typography variant={"subtitle1"}>{currencyFormat(subtotal, "$")}</Typography>
                </Stack>
            </Container>
            <Box sx={{flex: "0 1 auto", p: 1}}>
                <Button
                    sx={{borderRadius: 2}}
                    disableElevation
                    disabled={!basket || subtotal === 0}
                    onClick={() => onClose(false)}
                    component={Link}
                    to={"/checkout"}
                    color={"secondary"}
                    startIcon={<ShoppingCartCheckout/>}
                    fullWidth
                    variant={"contained"}>
                    Checkout
                </Button>
            </Box>
        </Box>
    )
}