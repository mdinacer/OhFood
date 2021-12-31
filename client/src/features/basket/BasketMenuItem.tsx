import {Box, Container, Grid, IconButton, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {currencyFormat} from "../../app/util/util";
import QuantityStepper from "../../app/components/QuantityStepper";
import {addBasketItemAsync, removeBasketItemAsync} from "../../app/slices/basketSlice";
import {Clear} from "@mui/icons-material";
import React from "react";
import {BasketItem} from "../../app/models/basket";
import {useAppDispatch} from "../../app/store/configureStore";

interface Props {
    item: BasketItem;
    status: string
}

export default function BasketMenuItem({item, status}: Props) {
    const dispatch = useAppDispatch();
    return (
        <Grid container columnSpacing={1}>
            <Grid item xs={4}
                  sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Box sx={{width: 90, height: 105, objectFit: "contain"}} component={"img"}
                     src={item.pictureUrl}/>
            </Grid>
            <Grid item xs={8}>
                <Container sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography variant={"subtitle2"}>{item.name}</Typography>
                    <Typography variant={"caption"}>{item.type}</Typography>
                    <Typography
                        variant={"body2"}>{currencyFormat(item.price, "$")}</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <QuantityStepper quantity={item.quantity}
                                         increase={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                         decrease={() => dispatch(removeBasketItemAsync({
                                             productId: item.productId,
                                             quantity: 1,
                                             name: 'rem'
                                         }))} isRow={true}
                                         minValue={1}
                                         loading={status.includes('pending')}
                        />
                        <IconButton color={"inherit"}
                                    onClick={() => dispatch(removeBasketItemAsync({
                                        productId: item.productId,
                                        quantity: item.quantity,
                                        name: 'del'
                                    }))}>
                            <Clear/>
                        </IconButton>
                    </Stack>
                </Container>
            </Grid>
        </Grid>
    )
}