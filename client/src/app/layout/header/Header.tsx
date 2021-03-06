import React, {useState} from "react";
import {useAppSelector} from "../../store/configureStore";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenu from "./UserMenu";
import {Badge, Box, Container, Drawer, IconButton, Link, MenuItem, Stack, useMediaQuery,} from "@mui/material";

import {AccountCircle, ShoppingCart} from "@mui/icons-material";

import "./Header.scss";
import PagesList from "./PagesList";
import {styled, useTheme} from "@mui/material/styles";
import HeaderMobile from "./HeaderMobile";
import BasketMenu from "../../../features/basket/BasketMenu";


export default function Header() {
    const {basket} = useAppSelector((state) => state.basket);
    const {user} = useAppSelector((state) => state.account);
    //const {connection} = useSignalR("App")
    const itemsCount = getBasketItemsCount();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [state, setState] = useState(false);


    function getBasketItemsCount() {
        if (basket) {
            return basket.items.reduce((sum, item) => sum + item.quantity, 0);
        } else {
            return 0;
        }
    }

    const CustomAppBar = styled(AppBar)({
        background: "rgba(0, 0, 0, .7)",
        color: "#FFF",
    })

    const closeDrawer = (value: boolean) => setState(value);

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

                setState(open);
            };

    return (
        <Box className={"header"}>
            {!isMobile ?
                (
                    <CustomAppBar elevation={1}>
                        <Container className="app-bar-container">
                            <Toolbar disableGutters variant={"dense"}>
                                <Link href={"/"} sx={{
                                    textDecoration:"none",
                                    cursor:"pointer",
                                    color:"white",
                                    fontSize:"1.3rem",
                                    fontWeight:"bold"
                                }}>
                                   <Stack alignItems={"center"} direction={"row"}>
                                       <Typography fontFamily={"Bebas Neue !important"} fontSize={"1.4rem"} >Delice</Typography>
                                       <Typography fontFamily={"Montserrat !important"} fontWeight={"bolder"} fontSize={"1.4rem"} color={"primary"}>Yum</Typography>
                                   </Stack>
                                </Link>


                                <Box
                                    sx={{
                                        display: {xs: "none", md: "flex"},
                                        mx: "auto",
                                    }}
                                >
                                    <PagesList onClose={() => {
                                    }}/>
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

                                {/*{user && (*/}
                                {/*    <NotificationMenu />*/}
                                {/*)}*/}
                            </Toolbar>
                        </Container>
                    </CustomAppBar>
                ) :
                (
                    <HeaderMobile user={user} itemsCount={itemsCount}/>
                )
            }

            <Drawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer("right", false)}
                sx={{
                    "& 	.MuiDrawer-paper": {
                        //backgroundColor: "white",
                        //color: "black"
                    }
                }} variant={"temporary"}
            >
                <BasketMenu onClose={closeDrawer}/>
            </Drawer>

        </Box>
    );
}
