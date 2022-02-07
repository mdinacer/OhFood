import {useEffect, useState} from "react";
import {Box, Button, Container, Divider, Paper, Stack, Typography} from "@mui/material";
import {Add, Settings} from "@mui/icons-material";

import {
    fetchCategoriesAsync,
    fetchProductsAsync,
    productSelectors,
    setProductParams
} from "../../app/slices/catalogSlice";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import AdminProductForm from "./components/AdminProductForm";
import {Product} from "../../app/models/product";
import AdminProductsTableHeader from "./components/AdminProductsTableHeader";
import AdminProductsTable from "./components/AdminProductsTable";
import AdminProductsTablePagination from "./components/AdminProductsTablePagination";
import AdminCategoriesEdit from "./components/AdminCategoriesEdit";


export default function AdminProductsPage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        metaData,
        productParams,
        categoriesLoaded,
        categories
    } = useAppSelector((state) => state.catalog);
    const [isEdit, setIsEdit] = useState(false)
    const [isCategoryEdit, setIsCategoryEdit] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const handleOpenForm = (item: Product) => {
        setSelectedProduct(item);
        setIsEdit(true)
    }

    function cancelEdit() {
        if (selectedProduct) setSelectedProduct(undefined);
        setIsEdit(false);
    }

    useEffect(() => {
        if (!categoriesLoaded) {
            dispatch(fetchCategoriesAsync())
        }
    }, [dispatch, categoriesLoaded]);


    useEffect(() => {
        if (productParams && productParams.pageSize < 10) {
            dispatch(setProductParams({...productParams, pageSize: 10, pageNumber: 1}));
        }
    }, [dispatch, productParams])

    useEffect(() => {
        if (!productsLoaded) {
            dispatch(fetchProductsAsync());
        }
    }, [dispatch, productsLoaded]);

    //if (!productsLoaded || !categoriesLoaded) return <LoadingComponent fullScreen={true}/>

    if (isEdit) return <AdminProductForm cancelEdit={cancelEdit} product={selectedProduct}/>
    if (isCategoryEdit) return <AdminCategoriesEdit onClose={() => setIsCategoryEdit(false)}/>

    return (
        <Container>

            <Paper sx={{p:4}}>
                <Box sx={{
                    display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", mb: 5
                }}>
                    <Typography variant={"h3"} component={"h1"}>Products Management</Typography>
                    <Stack direction={"row"}
                           sx={{justifyContent: "space-evenly", alignItems: "center", height: "100%"}}>
                        <Button startIcon={<Add/>} size={"small"} variant={"text"} color={"inherit"}
                                onClick={() => {
                                    setSelectedProduct(undefined);
                                    setIsEdit(true)
                                }}>
                            Add Product
                        </Button>

                        <Button startIcon={<Settings/>} size={"small"} variant={"text"} color={"inherit"}
                                onClick={() => setIsCategoryEdit(true)}>
                            Categories
                        </Button>
                    </Stack>
                </Box>
                <AdminProductsTableHeader productParams={productParams} categories={categories}
                                          categoriesLoaded={categoriesLoaded}/>
                <Divider flexItem sx={{my: 2}}/>
                <Box sx={{width: '100%', overflow: 'hidden'}}>
                    <AdminProductsTable products={products} openForm={handleOpenForm}/>
                </Box>
                {metaData && (
                    <AdminProductsTablePagination metaData={metaData} productParams={productParams}/>
                )}
            </Paper>
        </Container>
    )
}

