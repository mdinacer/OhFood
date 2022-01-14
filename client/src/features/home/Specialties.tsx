import { Box, Container, Grid, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { CategoryFull } from "../../app/models/category";
import "./Specialties.scss";
import agent from "../../app/api/agent";
import CategoryItem from "./CategoryItem";

export default function Specialties() {
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


    if (loading) return <LoadingComponent message="Loading Specialties..." />;
    return (
        <Box className="specialties">
            <Container maxWidth={"xl"} sx={{
                pt: { md: 7, xs: 2 },
                pb: { xs: 7, md: 2 },
            }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        textTransform: "uppercase",
                    }}
                >
                    Our Specialties
                </Typography>
                <Box sx={{ position: "relative" }}>
                    <Grid container spacing={2} sx={{ py: 3 }}>
                        {categories.map((category) => (
                            <CategoryItem collapsed={collapsed} handleCollapsed={handleCollapsed} key={category.id} item={category} />
                        ))}
                    </Grid>

                </Box>
            </Container>
        </Box>
    );
}
