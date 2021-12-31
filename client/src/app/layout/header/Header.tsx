import React, {useState} from "react";
import {useAppSelector} from "../../store/configureStore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenu from "./UserMenu";
import {Badge, Box, Container, Drawer, IconButton, MenuItem, useMediaQuery,} from "@mui/material";

import {AccountCircle, ShoppingCart} from "@mui/icons-material";

import "./Header.scss";
import PagesList from "./PagesList";
import {useTheme} from "@mui/material/styles";
import HeaderMobile from "./HeaderMobile";
import BasketMenu from "../../../features/basket/BasketMenu";


export default function Header() {
    const {basket} = useAppSelector((state) => state.basket);
    const {user} = useAppSelector((state) => state.account);
    const itemsCount = getBasketItemsCount();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [state, setState] = useState({
        top: false,
        bottom: false,
        right: false,
    });

    function getBasketItemsCount() {
        if (basket) {
            return basket.items.reduce((sum, item) => sum + item.quantity, 0);
        } else {
            return 0;
        }
    }

    const closeDrawer = (value: boolean) => setState({...state, right: value});

    const toggleDrawer =
        (anchor: string, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" ||
                        (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };

    return (
        <Box className={"header"}>
            {!isMobile ?
                (
                    <AppBar className="app-bar">
                        <Container className="app-bar-container">
                            <Toolbar disableGutters variant={"dense"}>

                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{mr: 2, display: {xs: "none", md: "flex"}}}
                                >
                                    OhFood
                                </Typography>

                                <Box
                                    sx={{
                                        display: {xs: "none", md: "flex"},
                                        mx: "auto",
                                    }}
                                >
                                    <PagesList/>
                                </Box>
                                <MenuItem sx={{px: 0}}>
                                    <IconButton
                                        size="small"
                                        aria-label="show Shopping cart"
                                        color="inherit"
                                        onClick={toggleDrawer("right", true)}
                                    >
                                        <Badge badgeContent={itemsCount} color="error">
                                            <ShoppingCart/>
                                        </Badge>
                                    </IconButton>
                                </MenuItem>
                                <MenuItem sx={{px: 1}}>
                                    {user ? (
                                        <UserMenu user={user}/>
                                    ) : (
                                        <IconButton
                                            size="small"
                                            aria-label="Login"
                                            color="inherit"
                                            href={"/login"}
                                        >
                                            <AccountCircle/>
                                        </IconButton>
                                    )}
                                </MenuItem>
                            </Toolbar>
                        </Container>
                    </AppBar>
                ) :
                (
                    <HeaderMobile user={user} itemsCount={itemsCount}/>
                )
            }

            <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                sx={{
                    "& 	.MuiDrawer-paper": {
                        backgroundColor: "white",
                        color: "black"
                    }
                }} variant={"temporary"} transitionDuration={500}
            >
                <BasketMenu onClose={closeDrawer}/>
            </Drawer>

        </Box>
    );
}
