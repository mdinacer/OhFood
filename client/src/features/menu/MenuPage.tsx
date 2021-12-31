import {Box, Button, Collapse, Container, Drawer, Grid, IconButton, Typography} from "@mui/material";
import useProducts from "../../app/hooks/useProducts";
import {useAppDispatch} from "../../app/store/configureStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {useEffect, useState} from "react";
import {ProductType} from "../../app/models/productType";
import ProductList from "./ProductList";
import {setProductParams} from "../../app/slices/catalogSlice";
import {GridView, Menu, Search, ViewAgenda} from '@mui/icons-material';
import "./MenuPage.scss";
import FiltersList from "./FiltersList";
import SearchBar from "./SearchBar";
import {useLocation} from "react-router-dom";

const newItem = {name: "All", id: 0, pictureUrl: "/images/backgrounds/product_details_bg.webp"};


export default function MenuPage() {
    const dispatch = useAppDispatch();
    const {state}: any = useLocation()
    const {products, types, typesLoaded, metaData} = useProducts();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [selectedType, setSelectedType] = useState<ProductType | null>(null);
    const [itemView, setItemView] = useState(6);

    const [isOpen, setIsOpen] = useState({
        searchCollapse: false,
        filtersDrawer: false,
    })

    const handleFiltersDrawer = (state: boolean) =>
        setIsOpen({...isOpen, filtersDrawer: state});
    const handleSearchCollapse = (state: boolean) =>
        setIsOpen({...isOpen, searchCollapse: state});

    const getBackground = () => selectedType && selectedType.pictureUrl
        ? selectedType.pictureUrl
        : "/images/backgrounds/product_details_bg.webp";


    useEffect(() => {
        if (typesLoaded) {
            const values = [newItem, ...types];
            setProductTypes(values);
            setSelectedType(newItem)
        }
    }, [types, typesLoaded])


    function handleTypeChanged(typeId: number) {
        const type = types.find(t => t.id === typeId)
        if (type) {
            setSelectedType(type);
            handleCloseFiltersDrawer();
            dispatch(setProductParams({type: type.id > 0 ? type.id : null}));
        } else {
            dispatch(setProductParams({type: null}));
        }
    }

    useEffect(() => {
        if (typesLoaded && state && state.typeId) {
            const type = types.find(t => t.id === parseInt(state.typeId))
            if (type) {
                dispatch(setProductParams({type: type.id}));
                setSelectedType(type)
            }
        }
    }, [dispatch, state, types, typesLoaded])

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
        <FiltersList productTypes={productTypes} handleTypeChanged={handleTypeChanged}
                     handleSortChanged={handleSortChanged} selectedTypeId={selectedType?.id}/>
    )

    if (!typesLoaded || (!typesLoaded && state && state.typeId)) return <LoadingComponent/>

    return (
        <>
            <Box className={"menu"} sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgb(0, 0, 0)),url(${getBackground()});`
                , pt: {md: 10, xs: 3}, pb: {md: 2, xs: 7}
            }}>
                <Container sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                    <Box sx={{flex: "0 1 auto"}}>
                        <Typography variant={"h1"}>Menu</Typography>
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

                                <IconButton disabled={itemView === 12} onClick={() => setItemView(12)}>
                                    <ViewAgenda/>
                                </IconButton>
                                <IconButton disabled={itemView === 6} onClick={() => setItemView(6)}>
                                    <GridView/>
                                </IconButton>

                                <IconButton onClick={() => handleSearchCollapse(!isOpen.searchCollapse)}>
                                    <Search/>
                                </IconButton>
                            </Container>
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <Box sx={{height: "100%"}}>
                                <ProductList itemView={itemView} products={products} metaData={metaData}/>
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