import {Box, Grid} from "@mui/material";
import {Product} from "../../app/models/product";
import ProductItem from "./ProductItem";
import {MetaData} from "../../app/models/pagination";
import AppPagination from "../../app/components/AppPagination";
import {setPageNumber} from "../../app/slices/catalogSlice";
import {useAppDispatch} from "../../app/store/configureStore";

interface Props {
    products: Product[];
    metaData: MetaData | null;
}

export default function ProductList({products, metaData}: Props) {

    const dispatch = useAppDispatch();
    return (
        <Box sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <Grid container spacing={2} sx={{height: "100% !important",}}>
                {products.map(product => (
                    <Grid item xs={12} md={6} lg={4} key={product.id}>
                        <ProductItem product={product}/>
                    </Grid>
                ))}

            </Grid>
            <Box sx={{my: 2}} width={"100%"}>
                {metaData && <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />}
            </Box>
        </Box>
    )
}