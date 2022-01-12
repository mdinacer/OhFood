import { Box, Button, Collapse, Container, Drawer, Grid, IconButton, Typography } from "@mui/material";
import useProducts from "../../app/hooks/useProducts";
import { useAppDispatch } from "../../app/store/configureStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useEffect, useState } from "react";
import { Category } from "../../app/models/category";
import ProductList from "./ProductList";
import { setProductParams } from "../../app/slices/catalogSlice";
import {GridView, Menu, Search, Square, SquareOutlined, ViewAgenda, ViewDay} from '@mui/icons-material';
import "./MenuPage.scss";
import FiltersList from "./FiltersList";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";

const newItem = { name: "All", id: 0, pictureUrl: "/images/backgrounds/product_details_bg.webp" };


export default function MenuPage() {
    const dispatch = useAppDispatch();
    const { state }: any = useLocation()
    const { products, categories, categoriesLoaded, metaData } = useProducts();
    const [productCategories, setProductCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [itemView, setItemView] = useState(12);

    const [isOpen, setIsOpen] = useState({
        searchCollapse: false,
        filtersDrawer: false,
    })

    const handleFiltersDrawer = (state: boolean) =>
        setIsOpen({ ...isOpen, filtersDrawer: state });
    const handleSearchCollapse = (state: boolean) =>
        setIsOpen({ ...isOpen, searchCollapse: state });

    const getBackground = () => selectedCategory && selectedCategory.pictureUrl
        ? selectedCategory.pictureUrl
        : "/images/backgrounds/product_details_bg.webp";


    useEffect(() => {
        if (categoriesLoaded) {
            const values = [newItem, ...categories];
            setProductCategories(values);
            setSelectedCategory(newItem)
        }
    }, [categories, categoriesLoaded])


    // useEffect(() => {
    //     if(connection){
    //         console.log("Connection Started")
    //     }
    // },[connection])

    function handleTypeChanged(typeId: number) {
        const category = categories.find(c => c.id === typeId)
        if (category) {
            setSelectedCategory(category);
            handleCloseFiltersDrawer();
            dispatch(setProductParams({ type: category.id > 0 ? category.id : null }));
        } else {
            dispatch(setProductParams({ type: null }));
        }
    }

    useEffect(() => {
        if (categoriesLoaded && state && state.categoryId) {
            const category = categories.find(c => c.id === parseInt(state.categoryId))
            if (category) {
                dispatch(setProductParams({ type: category.id }));
                setSelectedCategory(category)
            }
        }
    }, [categories, categoriesLoaded, dispatch, state])

    function handleSortChanged(sort: string) {
        dispatch(setProductParams({ orderBy: sort }));
        handleCloseFiltersDrawer();
    }

    function handleCloseFiltersDrawer() {
        if (isOpen.filtersDrawer)
            handleFiltersDrawer(false);
    }


    const searchInput = () => (
        <SearchBar />
    )

    const list = () => (
        <FiltersList categories={productCategories} handleCategoryChanged={handleTypeChanged}
            handleSortChanged={handleSortChanged} selectedCategoryId={selectedCategory?.id} />
    )

    if (!categoriesLoaded || (!categoriesLoaded && state && state.categoryId)) return <LoadingComponent fullScreen={true} message={"Loading menu data"} />

    return (
        <>
            <Box className={"menu"} sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)),url(${getBackground()});`
                , pt: { md: 10, xs: 3 }, pb: { md: 2, xs: 7 }
            }}>
                <Container maxWidth={"xl"} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                    <Box sx={{ flex: "0 1 auto" }}>
                        <Typography variant={"h4"} component={"h1"} gutterBottom>Menu</Typography>
                        <Box sx={{ pb: 3, width: "400px", ml: "auto", mr: 3, display: { xs: "none", md: "block" } }}>
                            {searchInput()}
                        </Box>
                        <Collapse in={isOpen.searchCollapse}>
                            {searchInput()}
                        </Collapse>
                    </Box>
                    <Grid container sx={{ height: "100%", flex: "1 1 auto" }}>
                        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
                            {list()}
                        </Grid>
                        <Grid item xs={12} sx={{ display: { xs: "block", md: "none" }, py: 3 }}>
                            <Container sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <IconButton onClick={() => handleFiltersDrawer(true)}>
                                    <Menu />
                                </IconButton>

                                {/*<IconButton color={itemView === 12 ? "primary": "inherit"}  onClick={() => setItemView(12)}>*/}
                                {/*    <ViewDay />*/}
                                {/*</IconButton>*/}
                                {/*<IconButton  color={itemView === 6 ? "primary": "inherit"} onClick={() => setItemView(6)}>*/}
                                {/*    <GridView />*/}
                                {/*</IconButton>*/}

                                <IconButton onClick={() => handleSearchCollapse(!isOpen.searchCollapse)}>
                                    <Search />
                                </IconButton>
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box sx={{ height: "100%" }}>
                                <ProductList  products={products} metaData={metaData} />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                <Drawer
                    anchor={"left"}
                    open={isOpen.filtersDrawer}
                    onClose={() => handleFiltersDrawer(false)}
                >
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}
                        sx={{ my: 3, height: "100%" }}>
                        {list()}
                        <Button onClick={() => handleFiltersDrawer(false)} variant={"text"}>Close</Button>
                    </Box>
                </Drawer>
            </Box>
        </>
    )
}