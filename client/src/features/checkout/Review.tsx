import {Box, Container, Grid, IconButton, List, ListItem, ListItemText, Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import QuantityStepper from "../../app/components/QuantityStepper";
import {addBasketItemAsync, removeBasketItemAsync} from "../../app/slices/basketSlice";
import {DeleteForever} from "@mui/icons-material";

export default function Review() {
    const {basket,status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            {basket && (
                <List sx={{overflow: "auto", flex: "1 1 auto", px: 1}}>
                    {basket.items.length > 0 && basket.items.map(item => (
                        <ListItem key={item.name} sx={{py: 0}}>
                            <ListItemText>
                                <Box  component={Paper} sx={{px: 1, py: 1}}>
                                    <Grid  container alignItems={"center"}>

                                        <Grid  item md={3} xs={1}  sx={{px: 1,display:{xs:"block", md:"none"} }}>
                                            <QuantityStepper quantity={item.quantity}
                                                             increase={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                                             decrease={() => dispatch(removeBasketItemAsync({
                                                                 productId: item.productId,
                                                                 quantity: 1,
                                                                 name: 'rem'
                                                             }))}
                                                             isRow={false}
                                                             minValue={1}
                                                             loading={status.includes('pending')}
                                            />
                                        </Grid>
                                        <Grid item md={6} xs={11}>
                                            <Container>
                                                <Box display={"flex"} flexDirection={"column"}>
                                                    <Typography variant={"caption"}
                                                                color={"text.secondary"}>{item.type}</Typography>
                                                    <Typography variant={"subtitle1"}>{item.name}</Typography>


                                                </Box>
                                            </Container>
                                        </Grid>
                                        <Grid item md={3} xs={0}  sx={{px: 1, display:{xs:"none", md:"block"}}}>
                                            <QuantityStepper quantity={item.quantity}
                                                             increase={() => dispatch(addBasketItemAsync({productId: item.productId}))}
                                                             decrease={() => dispatch(removeBasketItemAsync({
                                                                 productId: item.productId,
                                                                 quantity: 1,
                                                                 name: 'rem'
                                                             }))}
                                                             isRow={true}
                                                             minValue={1}
                                                             loading={status.includes('pending')}
                                            />
                                        </Grid>
                                        <Grid item md={2} xs={10}>
                                            <Typography textAlign={"center"} variant={"body1"}
                                            >{item.price * item.quantity} DA</Typography>
                                        </Grid>
                                        <Grid item md={1} xs={2} >
                                            <IconButton sx={{mx:"auto", width:"100%"}} onClick={() => dispatch(removeBasketItemAsync({
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
            )}
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    {/*<BasketSummary />*/}
                </Grid>
            </Grid>
        </>
    );
}