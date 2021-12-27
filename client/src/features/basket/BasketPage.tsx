import {Box, Container, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import QuantityStepper from "../../app/components/QuantityStepper";
import {addBasketItemAsync, removeBasketItemAsync} from "../../app/slices/basketSlice";
import {DeleteForever} from "@mui/icons-material";

export default function BasketPage() {
    const dispatch = useAppDispatch();
    const {basket, status} = useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>
    return (
        <Box className={"basket"} sx={{width: {md: 500, xs: "auto"}, py: 3}}
             height={"100%"} display={"flex"}
             alignItems={"center"}
             flexDirection={"column"} justifyContent={"space-between"}>
            <Typography sx={{flex: "0 1 auto"}} variant={"h6"}>You Cart</Typography>
            <List sx={{overflow: "auto", flex: "1 1 auto", px: 1}}>
                {basket.items.length > 0 && basket.items.map(item => (
                    <ListItem key={item.name} sx={{py: 0}}>
                        <ListItemText>
                            <Box component={Paper} sx={{px: 2, py: 1}}>
                                <Grid container alignItems={"center"}>
                                    <Grid item md={2} xs={2} sx={{px: 1}}>
                                        <QuantityStepper quantity={item.quantity}
                                                         increase={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                                         decrease={() => dispatch(removeBasketItemAsync({
                                                             productId: item.productId,
                                                             quantity: 1,
                                                             name: 'rem'
                                                         }))} isRow={false}
                                                         minValue={1}
                                                         loading={status.includes('pending')}
                                        />
                                    </Grid>
                                    <Grid item xs={0} md={2} sx={{display: {xs: "none", md: "block"}}}>
                                        <Box component={"img"} src={item.pictureUrl}
                                             sx={{
                                                 height: "100px",
                                                 objectFit: "contain",
                                                 objectPosition: "center",
                                                 width: "100%"
                                             }}/>
                                    </Grid>
                                    <Grid item xs={8} md={7}>
                                        <Container>
                                            <Box display={"flex"} flexDirection={"column"}>
                                                <Typography variant={"caption"}
                                                            color={"text.secondary"}>{item.type}</Typography>
                                                <Typography variant={"subtitle1"}>{item.name}</Typography>

                                                <Typography variant={"body1"}
                                                >{item.price * item.quantity} DA</Typography>
                                            </Box>
                                        </Container>
                                    </Grid>
                                    <Grid item md={1}>
                                        <IconButton onClick={() => dispatch(removeBasketItemAsync({
                                            productId: item.productId,
                                            quantity: item.quantity,
                                            name: 'del'
                                        }))}>
                                            <DeleteForever/>
                                        </IconButton>
                                    </Grid>


                                </Grid>
                            </Box>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>

            <Container sx={{
                flex: "0 1 auto",
                px: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",

            }}>
                <Typography variant={"caption"}>Total</Typography>
                <Typography variant={"h6"}>{subtotal} DA</Typography>
            </Container>
        </Box>
    )
}