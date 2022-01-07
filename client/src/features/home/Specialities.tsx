import { Box, Container, Grid, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { CategoryFull } from "../../app/models/category";
import "./Specialities.scss";
import agent from "../../app/api/agent";
import CategoryItem from "./CategoryItem";

export default function Specialities() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<CategoryFull[]>([]);
    const [collapsed, setCollapsed] = useState<{
        title: string | null;
    }>({ title: null });

    function handleCollapsed(item: string) {
        setCollapsed({ title: collapsed.title === item ? null : item });
    }

    useEffect(() => {
        setLoading(true);
        agent.Catalog.fetchCategoriesFull()
            .then((response: CategoryFull[]) => {
                setCategories(response);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, []);


    if (loading) return <LoadingComponent  message="Loading Specialities..." />;
    return (
        <Container sx={{
            pt: { md: 7, xs: 2 },
            mb: { xs: 7, md: 2 },
        }}>
            <Typography
                variant="h3"
                sx={{
                    textTransform: "uppercase",
                }}
            >
                Our Specialities
            </Typography>
            <Box sx={{ position: "relative" }}>
                <Grid container spacing={2} sx={{ py: 3 }}>
                    {categories.map((category) => (
                        <CategoryItem collapsed={collapsed} handleCollapsed={handleCollapsed} key={category.id} item={category} />
                    ))}
                </Grid>

            </Box>
        </Container>
    );
}
