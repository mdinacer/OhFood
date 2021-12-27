import {
    Box,
    Button,
    Collapse,
    Container,
    Fab,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import {ExpandLessOutlined, ExpandMoreOutlined, ShoppingCart,} from "@mui/icons-material";
import {useEffect, useState} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {ProductTypeFull} from "../../app/models/productType";
import "./Specialities.scss";
import agent from "../../app/api/agent";

export default function Specialities() {
    const [collapsed, setCollapsed] = useState<{
        title: string | null;
    }>({title: null});

    const [loading, setLoading] = useState(false);

    const [productTypes, setProductTypes] = useState<ProductTypeFull[]>([]);


    useEffect(() => {
        setLoading(true)
        agent.Catalog.fetchTypesFull()
            .then((response: ProductTypeFull[]) => {
                setProductTypes(response);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))

    }, [])

    function handleCollapsed(item: string) {
        setCollapsed({title: collapsed.title === item ? null : item});
    }


    const itemDetailed = (productType: ProductTypeFull) => (
        <Grid key={productType.name} item xs={12} md={6} className="item">
            <Paper
                elevation={2}
                sx={{
                    position: "relative",
                    borderRadius: 2,
                    overflow: "hidden",
                    height: "500px",
                }}
            >
                <Box
                    sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "grayscale(50%)",
                    }}
                    className="item-img"
                    component="img"
                    src={productType.pictureUrl}
                />

                <Box

                    className="text-container"
                    sx={{py: 3, maxHeight: 500, width: "100%"}}
                >
                    <Container>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h3">{productType.name}</Typography>
                            <IconButton
                                onClick={() => handleCollapsed(productType.name)}
                                sx={{
                                    color: "rgba(255, 255, 255, 0.54)",

                                }}
                                aria-label={`info about ${productType.name}`}
                            >
                                {collapsed.title === productType.name ? (
                                    <ExpandLessOutlined fontSize="large" color="primary"/>
                                ) : (
                                    <ExpandMoreOutlined fontSize="large" color="inherit"/>
                                )}
                            </IconButton>
                        </Box>

                        <Typography gutterBottom variant="subtitle1">
                            Lore ipsum dolor sit amet consectetur adipisicing.
                        </Typography>
                    </Container>

                    <Collapse in={collapsed.title === productType.name}>
                        <Box
                            sx={{
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,.2)",
                                px: 3,
                                py: 1,
                            }}
                        >
                            <List
                                sx={{
                                    width: "100%",
                                    position: "relative",
                                    overflow: "auto",
                                    height: "100%",
                                    maxHeight: 350,
                                    pr: 1,
                                    "& ul": {padding: 0},
                                }}
                            >

                                {productType.products.map(product => (
                                    <ListItem key={product.name}>
                                        <ListItemText

                                            primary={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                    }}
                                                >
                                                    <Typography variant="body1">{product.name}</Typography>
                                                    <Typography variant="subtitle1">{product.price > 0 ? `${product.price} DA` : "Free"}</Typography>
                                                </Box>
                                            }
                                            secondary={product.ingredients }
                                        />
                                    </ListItem>
                                ))}


                            </List>
                        </Box>
                    </Collapse>
                </Box>
            </Paper>
        </Grid>
    );

    if (loading) return <LoadingComponent message="Chargement..."/>;
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
                Nos specialités
            </Typography>
            <Box sx={{position: "relative"}}>
                <Grid container spacing={2} sx={{py: 3}}>
                    {productTypes.map(productType =>
                        (itemDetailed(productType))
                    )}
                    <Grid

                        item
                        xs={12}
                        sx={{display: {xs: "block", md: "none"}, color: "white"}}
                    >
                        <Button
                            startIcon={<ShoppingCart fontSize="inherit"/>}
                            variant="contained"
                            sx={{width: "100%", color: "white", fontSize: "1.2rem"}}
                        >
                            Commander
                        </Button>
                    </Grid>
                </Grid>
                <Fab
                    sx={{
                        display: {xs: "none", md: "block"},
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        height: 100,
                        width: 100,
                        border: "10px solid black",
                        color: "white",
                    }}
                    href="/menu"
                    color="primary"
                    variant="circular"
                    aria-label="add"
                >
                    <ShoppingCart
                        sx={{
                            fontSize: "3rem",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",

                            color: "white",
                        }}
                    />
                </Fab>
            </Box>
        </Container>
    );
}
