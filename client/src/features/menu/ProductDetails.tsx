import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {fetchProductAsync, productSelectors} from "../../app/slices/catalogSlice";
import {useEffect, useState} from "react";
import "./ProductDetails.scss";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import {AddShoppingCart, ChevronLeft, RemoveShoppingCart} from "@mui/icons-material";
import QuantityStepper from "../../app/components/QuantityStepper";
import {addBasketItemAsync, removeBasketItemAsync} from "../../app/slices/basketSlice";
import {LoadingButton} from "@mui/lab";
import {currencyFormat} from "../../app/util/util";

const style = {
    bgcolor: "rgba(255,255,255,0.7)",
    color: "black",
    boxShadow: 24,
    maxWidth: "900px",
    borderRadius: {xs: 0, md: 3},
    pt: 2
};


export default function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => id ? productSelectors.selectById(state, parseInt(id!)) : null);
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(1);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (id && !product) dispatch(fetchProductAsync(parseInt(id)))
    }, [id, item, dispatch, product]);


    const increase = () => {
        setQuantity(quantity + 1);
    }

    const decrease = () => {
        if (quantity > 1)
            setQuantity(quantity - 1);
    }


    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }

    function removeItem() {
        dispatch(removeBasketItemAsync({productId: product?.id!, quantity: item!.quantity}))
        setQuantity(1);
    }


    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...'/>

    if (!product) return <NotFound/>

    return (
        <Box className={"product-details"} sx={{pb: {xs: 7}, display: {md: "flex", xs: "block"}}} alignItems={"center"}
             justifyContent={"center"}>
            <Box sx={style}>
                <Grid container>
                    <Grid item xs={12} md={6} sx={{overflow: "hidden"}}>
                        <Box sx={{my: "auto", height: "100%"}} display={"flex"} alignItems={"center"}
                             justifyContent={"center"}>
                            <Box sx={{
                                objectFit: "cover", objectPosition: "center", height: "300px",
                            }} component={"img"} src={product?.pictureUrl} alt={product.name}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Container color={"inherit"} sx={{pb: 2}}>
                            <Typography variant={"h4"} gutterBottom>{product.name}</Typography>
                            <Typography variant={"body2"} gutterBottom>{product.description}</Typography>
                            <Typography sx={{textTransform: "uppercase"}}
                                        variant={"caption"}>Ingredients:</Typography>
                            <Typography variant={"body2"}
                                        gutterBottom>{product.ingredients || "French Fries - Cheese - Minced Meat - Salad"}</Typography>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"}
                                 sx={{py: 3}}>
                                <Typography textAlign={"center"}
                                            variant={"h5"}>{currencyFormat(product.price * quantity, "$")}</Typography>
                                <QuantityStepper minValue={1} isRow={true} quantity={quantity} increase={increase}
                                                 decrease={decrease} loading={status.includes('pending')}/>
                            </Box>

                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Button href={"/menu"} color={"inherit"} startIcon={<ChevronLeft/>}>
                                    Back
                                </Button>
                                {item && <LoadingButton
                                    disableElevation
                                    sx={{ml: "auto", mr: 1}}
                                    loading={status.includes('pending')}
                                    color={"error"}
                                    variant={"outlined"}
                                    onClick={removeItem}
                                >
                                    <RemoveShoppingCart/>
                                </LoadingButton>}
                                <LoadingButton
                                    disabled={item?.quantity === quantity}
                                    loading={status.includes('pending')}
                                    onClick={handleUpdateCart}
                                    disableElevation
                                    color='primary'
                                    size='small'
                                    variant='contained'
                                    sx={{color: "white"}}
                                >
                                    <AddShoppingCart/>
                                </LoadingButton>

                            </Stack>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}