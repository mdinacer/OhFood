import {Grid, List, ListItem} from '@mui/material';
import Typography from '@mui/material/Typography';
import {useAppSelector} from '../../app/store/configureStore';
import React from "react";
import BasketMenuItem from "../basket/BasketMenuItem";

export default function Review() {
    const {basket, status} = useAppSelector(state => state.basket);
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            {basket && (
                <List>
                    {basket.items.map(item => (
                        <ListItem key={item.productId} sx={{}}>
                            <BasketMenuItem item={item} status={status}/>
                        </ListItem>
                    ))}
                </List>
            )}
            <Grid container>
                <Grid item xs={6}/>
                <Grid item xs={6}>
                    {/*<BasketSummary />*/}
                </Grid>
            </Grid>
        </>
    );
}