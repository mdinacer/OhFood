import {Box, Container, Grid, Typography,} from "@mui/material";
import {useEffect, useState} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {ProductTypeFull} from "../../app/models/productType";
import "./Specialities.scss";
import agent from "../../app/api/agent";
import ProductTypeItem from "./ProductTypeItem";

export default function Specialities() {
    const [loading, setLoading] = useState(false);
    const [productTypes, setProductTypes] = useState<ProductTypeFull[]>([]);
    const [collapsed, setCollapsed] = useState<{
        title: string | null;
    }>({title: null});

    function handleCollapsed(item: string) {
        setCollapsed({title: collapsed.title === item ? null : item});
    }

    useEffect(() => {
        setLoading(true);
        agent.Catalog.fetchTypesFull()
            .then((response: ProductTypeFull[]) => {
                setProductTypes(response);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    if (loading) return <LoadingComponent/>;
    return (
        <Container sx={{px: 2}}>
            <Typography
                variant="h3"
                sx={{
                    textTransform: "uppercase",
                    pt: 10,
                    mb: 2,
                }}
            >
                Our Specialities
            </Typography>
            <Box sx={{position: "relative"}}>
                <Grid container spacing={2} sx={{py: 3}}>
                    {productTypes.map((productType) => (
                        <ProductTypeItem collapsed={collapsed} handleCollapsed={handleCollapsed} key={productType.id} item={productType}/>
                    ))}
                </Grid>

            </Box>
        </Container>
    );
}
