import {Box, Button, Collapse, Container, Drawer, Grid, IconButton, Typography} from "@mui/material";
import useProducts from "../../app/hooks/useProducts";
import {useAppDispatch} from "../../app/store/configureStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useEffect, useState} from "react";
import {Category} from "../../app/models/category";
import ProductList from "./ProductList";
import {setProductParams} from "../../app/slices/catalogSlice";
import {Menu, Search} from '@mui/icons-material';
import "./MenuPage.scss";
import FiltersList from "./FiltersList";
import SearchBar from "./SearchBar";

const newItem = {id: 0, name: "All", pictureUrl: "/images/backgrounds/product_details_bg.webp"};


export default function MenuPage() {
    const dispatch = useAppDispatch();
    const {products, categories, categoriesLoaded, metaData} = useProducts();
    const [productCategories, setProductCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category>(newItem);

    const [isOpen, setIsOpen] = useState({
        searchCollapse: false,
        filtersDrawer: false,
    })

    const handleFiltersDrawer = (state: boolean) =>
        setIsOpen({...isOpen, filtersDrawer: state});

    const handleSearchCollapse = (state: boolean) =>
        setIsOpen({...isOpen, searchCollapse: state});

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


    function handleCategoryChanged(categoryId: number) {
        const category = productCategories.find(c => c.id === categoryId)
        if (category && category.id > 0) {
            setSelectedCategory(category);
            handleCloseFiltersDrawer();
            dispatch(setProductParams({category: category.id}));
        }
        if (category && category.id === 0) {
            setSelectedCategory(newItem)
            dispatch(setProductParams({category: null}));

        }
    }


    function handleSortChanged(sort: string) {
        dispatch(setProductParams({orderBy: sort}));
        handleCloseFiltersDrawer();
    }

    function handleCloseFiltersDrawer() {
        if (isOpen.filtersDrawer)
            handleFiltersDrawer(false);
    }


    const searchInput = () => (
        <SearchBar/>
    )

    const list = () => (
        <FiltersList categories={productCategories} handleCategoryChanged={handleCategoryChanged}
                     handleSortChanged={handleSortChanged} selectedCategoryId={selectedCategory?.id}/>
    )

    if (!categoriesLoaded) return <LoadingComponent
        fullScreen={true} message={"Loading menu data"}/>

    return (
        <>
            <Box className={"menu"} sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)),url(${getBackground()});`
                , pt: {md: 10, xs: 3}, pb: {md: 2, xs: 7}
            }}>
                <Container maxWidth={"lg"} sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                    <Box sx={{flex: "0 1 auto"}}>
                        <Typography variant={"h3"} component={"h1"} gutterBottom>
                            {selectedCategory && selectedCategory.id !== 0 ? selectedCategory.name : "Menu"}
                        </Typography>
                        <Box sx={{pb: 3, width: "400px", ml: "auto", mr: 3, display: {xs: "none", md: "block"}}}>
                            {searchInput()}
                        </Box>
                        <Collapse in={isOpen.searchCollapse}>
                            {searchInput()}
                        </Collapse>
                    </Box>
                    <Grid container sx={{height: "100%", flex: "1 1 auto"}}>
                        <Grid item md={3} sx={{display: {xs: "none", md: "block"}}}>
                            {list()}
                        </Grid>
                        <Grid item xs={12} sx={{display: {xs: "block", md: "none"}, py: 3}}>
                            <Container sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <IconButton onClick={() => handleFiltersDrawer(true)}>
                                    <Menu/>
                                </IconButton>

                                <IconButton onClick={() => handleSearchCollapse(!isOpen.searchCollapse)}>
                                    <Search/>
                                </IconButton>
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box sx={{height: "100%"}}>
                                <ProductList products={products} metaData={metaData}/>
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
                         sx={{my: 3, height: "100%"}}>
                        {list()}
                        <Button onClick={() => handleFiltersDrawer(false)} variant={"text"}>Close</Button>
                    </Box>
                </Drawer>
            </Box>
        </>
    )
}