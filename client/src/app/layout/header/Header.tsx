import React, {useState} from "react";
import {useAppSelector} from "../../store/configureStore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import UserMenu from "./UserMenu";
import {Badge, Box, Button, Container, Drawer, IconButton, MenuItem, Stack,} from "@mui/material";

import {AccountCircle, Menu, ShoppingCart} from "@mui/icons-material";
import HeaderDrawer from "./HeaderDrawer";

import "./Header.scss";
import BasketPage from "../../../features/basket/BasketPage";
import PagesList from "./PagesList";


export default function Header() {
    const {basket} = useAppSelector((state) => state.basket);
    const {user} = useAppSelector((state) => state.account);
    const itemsCount = getBasketItemsCount();
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
        <>
            <Slide appear={false} direction="down" in={!useScrollTrigger()}>
                <AppBar
                    className="app-bar"
                    sx={{
                        color: "white",
                        display: {xs: "none", md: "block"},
                    }}
                >
                    <Container className="app-bar-container">
                        <Toolbar disableGutters>
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
            </Slide>
            <Slide appear={false} direction="up" in={!useScrollTrigger()}>
                <Box
                    className="nav-bar-mob"
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        display: {xs: "block", md: "none"},
                    }}
                >
                    <AppBar position="fixed" color="primary" sx={{top: 'auto', bottom: 0}}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer("bottom", true)}>
                                <Menu/>
                            </IconButton>
                            <Box sx={{flexGrow: 1}}/>
                            <IconButton color="inherit" onClick={toggleDrawer("right", true)}>
                                <ShoppingCart/>
                            </IconButton>
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
                        </Toolbar>
                    </AppBar>
                </Box>
            </Slide>

            <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
            >
                <Box sx={{width: "auto", height: "100vh"}}>
                    <BasketPage/>

                </Box>
                <Stack sx={{mx: 2}}>
                    <Button disableElevation variant={"contained"} sx={{color: "white"}}
                            onClick={toggleDrawer("right", false)} href={"/checkout"}>Check Out</Button>
                    <Button disableElevation sx={{my: 1}} variant={"outlined"}
                            onClick={toggleDrawer("right", false)}>Fermer</Button>
                </Stack>
            </Drawer>

            <Drawer
                sx={{

                    display: {xs: "block", md: "none"},
                }}
                anchor={"bottom"}
                open={state["bottom"]}
                onClose={toggleDrawer("bottom", false)}
            >
                <HeaderDrawer anchor={"bottom"} toggleDrawer={toggleDrawer}/>
            </Drawer>
        </>
    );
}
