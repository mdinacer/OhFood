import {Product} from "../../app/models/product";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {AddShoppingCart, AspectRatio} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {LoadingButton} from "@mui/lab";
import {addBasketItemAsync} from "../../app/slices/basketSlice";
import {Link} from "react-router-dom";
import {currencyFormat} from "../../app/util/util";

interface Props {
    product: Product;
}

export default function ProductItem({product}: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <Card sx={{maxHeight:"370px", height:"100%"}}>
            <CardMedia
                component="img"
                height="140"
                image={product.pictureUrl}
                alt={product.name}
            />
            <CardContent>
                <Typography variant="caption" color="text.secondary">
                    {product.type}
                </Typography>
                <Typography gutterBottom variant="h6" >
                    {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {currencyFormat(product.price,"$")}
                </Typography>
            </CardContent>
            <CardActions sx={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button component={Link} to={`/menu/${product.id}`} size="small"><AspectRatio sx={{color: "white"}}/></Button>
                <LoadingButton size="small" loading={status.includes('pendingAddItem' + product.id)}
                               onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}>
                    <AddShoppingCart/>
                </LoadingButton>
            </CardActions>
        </Card>
    )
}