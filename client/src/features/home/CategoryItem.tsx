import {
    Box,
    Collapse,
    Container,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    useMediaQuery
} from "@mui/material";
import {CategoryFull} from "../../app/models/category";
import {ExpandLessOutlined, ExpandMoreOutlined, ShoppingCart} from "@mui/icons-material";
import {currencyFormat} from "../../app/util/util";
import {useTheme} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";

interface Props {
    item: CategoryFull;
    handleCollapsed: (value: string) => void;
    collapsed: { title: string | null; }
}

export default function CategoryItem({item, handleCollapsed, collapsed}: Props) {

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const cartButton = () => (
        <IconButton
            sx={{
                p: 1,
                ml: "auto",
                color: "rgba(255, 255, 255, 0.54)",
            }}
            onClick={() => navigate('/menu', {state: {typeId: item.id}})}
            aria-label={`info about ${item.name}`}
        >
            <ShoppingCart fontSize="large" color="inherit"/>
        </IconButton>
    )

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
                <ExpandLessOutlined fontSize="large" color="inherit"/>
            )}
        </IconButton>
    );

    const productsList = (isSmall: boolean) => (

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
                        <ListItemText
                            primary={
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
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
                            }
                            secondary={!isSmall &&
                                (<Typography variant="caption">
                                    {product.ingredients}
                                </Typography>)
                            }
                        />
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
                        <Typography variant="h5" sx={{width: "100%"}}
                                    onClick={() => handleCollapsed(item.name)}>{item.name}</Typography>

                        {cartButton()}
                        {toggleCollapseButton()}
                    </Box>
                </Container>
                {productsList(true)}
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
                height: "500px",
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
                    py: 3,
                    maxHeight: {md: 500, xs: 300},
                    width: "100%",
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
                        <Typography sx={{cursor: "pointer", width: "100%"}} variant="h5"
                                    onClick={() => handleCollapsed(item.name)}>{item.name}</Typography>
                        {cartButton()}
                        {toggleCollapseButton()}
                    </Box>


                </Container>

                {productsList(false)}
            </Box>
        </Paper>
    )

    return (
        <Grid item xs={12} md={6} className="item">
            {isMobile ? ItemMobile() : ItemDesktop()}
        </Grid>
    )
}