import {
    Box,
    Collapse,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Paper,
    Typography,
    useMediaQuery
} from "@mui/material";
import {CategoryFull} from "../../app/models/category";
import {ExpandMoreOutlined, OpenInBrowser} from "@mui/icons-material";
import {currencyFormat} from "../../app/util/util";
import {useTheme} from '@mui/material/styles';
import {Link} from "react-router-dom";

interface Props {
    item: CategoryFull;
    handleCollapsed: (value: string) => void;
    collapsed: { title: string | null; }
}

export default function CategoryItem({item, handleCollapsed, collapsed}: Props) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const toggleCollapseButton = () => (
        <IconButton
            onClick={() => handleCollapsed(item.name)}
            sx={{
                color: "rgba(255, 255, 255, 0.54)",
            }}
            aria-label={`info about ${item.name}`}
        >
            {collapsed.title === item.name ? (
                <ExpandMoreOutlined fontSize="large" color="primary"/>
            ) : (
                <OpenInBrowser fontSize="large" color="primary"/>
            )}
        </IconButton>
    );

    const productsList = () => (

        <Collapse
            sx={{
                flex: "1 1 auto"
            }}
            in={collapsed.title === item.name}>
            <List
                sx={{
                    width: "100%",
                    position: "relative",
                    overflow: "auto",
                    height: "100%",
                    pr: 1,
                    "& ul": {padding: 0},
                }}
            >
                {item.products.map((product) => (
                    <ListItem key={product.name}>
                        <ListItemButton component={Link} to={`/menu/${product.id}`} color="inherit">
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    borderBottom: "1px solid rgba(255,255,255,.5)",
                                }}
                            >
                                <Typography variant="body1">
                                    {product.name}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {product.price > 0
                                        ? `${currencyFormat(product.price, "$")}`
                                        : "Free"}
                                </Typography>
                            </Box>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Collapse>
    );

    const ItemMobile = () => (
        <Paper sx={{
            position: "relative",
            borderRadius: 2,
            minHeight: "45vh",
            maxHeight: "85vh",
            backgroundImage: `url(${item.pictureUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
        }}>

            <Box
                height={"100%"}
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                overflow={"auto"}
                sx={{
                    backgroundColor: "rgba(0,0,0,.7)",
                    backdropFilter: " blur(4px)",
                    py: 2
                }}
            >
                <Container sx={{flex: "0 1 auto"}}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >

                        <Typography variant="h4" sx={{width: "100%", fontFamily: "'Bebas Neue' !important "}}
                                    onClick={() => handleCollapsed(item.name)}>{item.name}</Typography>

                        {toggleCollapseButton()}
                        {/* {cartButton()} */}
                    </Box>
                </Container>
                {productsList()}
            </Box>

        </Paper>


    )

    const ItemDesktop = () => (
        <Paper
            elevation={2}
            sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: "45vh",
            }}
        >
            <Box
                sx={{
                    display: {xs: "block", md: "block"},
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: "grayscale(50%)",
                }}
                className="item-img"
                component="img"
                src={item.pictureUrl}
            />


            <Box
                className="text-container absolute"
                sx={{
                    py: 1,
                    maxHeight: {md: "45vh", xs: 300},
                    width: "100%",
                    overflow: "auto",
                }}
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
                        <Typography className={"itemName"}
                                    sx={{cursor: "pointer", width: "100%", fontFamily: "'Bebas Neue' !important ",}}
                                    variant="h4"
                                    onClick={() => handleCollapsed(item.name)}>{item.name}</Typography>

                        {toggleCollapseButton()}
                        {/* {cartButton()} */}
                    </Box>


                </Container>

                {productsList()}
            </Box>
        </Paper>
    )

    return (
        <Grid item xs={12} sm={6} md={6} xl={4} className="item">
            {isMobile ? ItemMobile() : ItemDesktop()}
        </Grid>
    )
}