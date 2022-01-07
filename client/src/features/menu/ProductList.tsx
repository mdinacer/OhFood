import { Box, Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductItem from "./ProductItem";
import { MetaData } from "../../app/models/pagination";
import AppPagination from "../../app/components/AppPagination";
import { setPageNumber } from "../../app/slices/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductItemSkeleton from "./ProductItemSkeleton";

interface Props {
  products: Product[];
  metaData: MetaData | null;
  itemView: number;
}

export default function ProductList({ products, metaData, itemView }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} sx={{ height: "100% !important" }}>
        {products.map((product) => (
          <Grid item xs={itemView} md={4} lg={3} key={product.id}>
            {!productsLoaded ? (
              <ProductItemSkeleton />
            ) : (
              <ProductItem product={product} />
            )}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ my: 2 }} width={"100%"}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Box>
    </Box>
  );
}
