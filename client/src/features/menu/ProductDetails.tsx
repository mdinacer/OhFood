import {Box, Button, Container, Grid, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {fetchProductAsync, productSelectors} from "../../app/slices/catalogSlice";
import {useEffect, useState} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import {
    AddShoppingCart,
    AddShoppingCartOutlined,
    ChevronLeft,
    RemoveShoppingCart,
    RemoveShoppingCartOutlined
} from "@mui/icons-material";
import QuantityStepper from "../../app/components/QuantityStepper";
import {addBasketItemAsync, removeBasketItemAsync} from "../../app/slices/basketSlice";
import {LoadingButton} from "@mui/lab";
import {currencyFormat} from "../../app/util/util";
import "./ProductDetails.scss";


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


    if (productStatus.includes('pending')) return <LoadingComponent fullScreen={true} message='Loading product...'/>

    if (!product) return <NotFound/>

    return (
        <Box
            sx={{

                width: "100%",
                minHeight: "100vh",
                display: "flex",
                backgroundImage: {
                    md: "linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)),url('/images/backgrounds/product_details_bg.webp')",
                    xs: "none"
                },
                backgroundColor: "#000",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top",
                pt: {xs: 1, md: "60px"},
                pb: {md: 1, xs: "60px"},

                alignItems: "center",
                justifyContent: {xs: "none", md: "center"},


            }}>

            <Container
                maxWidth={"md"}
                sx={{
                    root: {
                        bgcolor: "#000",
                    },
                    bgcolor: {xs: "#000", md: "rgba(0,0,0,.7)"},
                    borderRadius: {xs: 0, md: 3},
                    height: "100%",


                }}>
                <Grid container>
                    <Grid item xs={12} md={6} sx={{
                        py: {xs: 0, md: 2},
                        px: {xs: 3, md: 3},
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    >
                        <Box sx={{
                            position: "relative",
                            height: {xs: "200px", md: "300px"},
                            width: {xs: "200px", md: "300px"},
                            overflow: "hidden",
                            my: {md: 3, xs: 2},

                        }}>
                            <Box sx={{
                                objectFit: "contain",
                                objectPosition: "center",
                                height: "100%",
                                width: "100%",
                                zIndex: "3"
                            }} component={"img"} src={product?.pictureUrl} alt={product.name}/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component={Container} height={"100%"} display={"flex"} flexDirection={"column"}
                             alignItems={"center"}
                             justifyContent={"center"} sx={{py: {md: 3, xs: 0}}}>
                            <Stack
                                sx={{
                                    alignItems: {xs: "flex-end", md: "flex-start"},
                                    width: "100%",
                                    flex: "0 1 auto",
                                }}
                                direction={"column"}>
                                <Typography sx={{textTransform: "uppercase"}}
                                            variant={"caption"}>
                                    {product.category}
                                </Typography>

                                <Typography sx={{fontFamily:"Bebas Neue, cursive !important"}} color={"primary"} variant={"h3"} gutterBottom>
                                    {product.name}
                                </Typography>

                            </Stack>
                            <Typography gutterBottom sx={{textAlign: {md: "left", xs: "right"}, flex: "1 1 auto"}}
                                        variant={"body2"}>
                                {product.description}
                            </Typography>
                            <Stack component={Container} sx={{
                                width: "100%",
                                my: 1,
                                justifyContent: {xs: "space-between", md: "space-around"},
                                flex: "0 1 auto"
                            }} direction={"row"}>
                                <Stack>
                                    <Typography sx={{textTransform: "uppercase"}}
                                                variant={"caption"}>Quantity</Typography>
                                    <QuantityStepper minValue={1} isRow={true} quantity={quantity} increase={increase}
                                                     decrease={decrease} loading={status.includes('pending')}/>
                                </Stack>
                                <Stack>
                                    <Typography sx={{textTransform: "uppercase"}} textAlign={"right"}
                                                variant={"caption"}>{quantity > 1 ? "Total Price" : "Unit Price"}</Typography>
                                    <Typography textAlign={"center"} color={"inherit"} variant={"h5"} gutterBottom>
                                        {currencyFormat(product.price * quantity, "$")}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack sx={{width: "100%", my: 1, flex: "0 1 auto"}} direction={"row"}
                                   justifyContent={"space-between"}>
                                <Button href={"/menu"} color={"inherit"} startIcon={<ChevronLeft/>}>
                                    Back
                                </Button>


                                {item && <LoadingButton
                                    disableElevation
                                    sx={{ml: "auto", mr: 1}}
                                    loading={status.includes('pending')}
                                    color={"error"}

                                    variant={"contained"}
                                    onClick={removeItem}
                                >
                                    <RemoveShoppingCartOutlined/>
                                </LoadingButton>}
                                <LoadingButton
                                    disabled={item?.quantity === quantity}
                                    loading={status.includes('pending')}
                                    onClick={handleUpdateCart}
                                    disableElevation
                                    color='secondary'
                                    size='small'
                                    variant='contained'

                                >
                                    <AddShoppingCartOutlined/>
                                </LoadingButton>

                            </Stack>
                            <Container>
                            </Container>
                        </Box>
                    </Grid>
                </Grid>

            </Container>

            <Box hidden>
                <Grid container>
                    <Grid item xs={12} md={6} sx={{overflow: "hidden", py: {xs: 2, md: "auto"}}}>
                        <Box sx={{height: "100%"}} display={"flex"} alignItems={"center"}
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
    );
}