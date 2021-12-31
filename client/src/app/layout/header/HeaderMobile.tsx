import {
    Badge,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Container,
    Drawer,
    IconButton,
    Paper
} from "@mui/material";
import {AccountCircle, ExpandMore, Home, Menu, ShoppingCart} from "@mui/icons-material";
import React, {useState} from "react";
import {User} from "../../models/user";
import PagesList from "./PagesList";
import {Link} from "react-router-dom";
import BasketMenu from "../../../features/basket/BasketMenu";
import UserLinkList from "./UserLinkList";

interface Props {
    user: User | null;
    itemsCount: number;
}

export default function HeaderMobile({user, itemsCount}: Props) {
    const [open, setOpen] = useState({
        basket: false,
        menu: false,
        user: false,
    })

    const handleBasketDrawer = (state: boolean) => setOpen({...open, basket: state});
    const handleMenuDrawer = (state: boolean) => setOpen({...open, menu: state});
    const handleUserDrawer = (state: boolean) => setOpen({...open, user: state});

    return (
        <Box>
            <Paper sx={{position: 'fixed', top: "auto", bottom: 0, left: 0, right: 0, zIndex: 1000}} elevation={3}>
                <BottomNavigation>
                    <BottomNavigationAction label="Menu" icon={<Menu/>} onClick={() => handleMenuDrawer(true)}/>
                    <BottomNavigationAction component={Link} to={"/"} label="Home" icon={<Home/>}/>
                    <BottomNavigationAction label="Cart" icon={
                        <Badge badgeContent={itemsCount} color="error">
                            <ShoppingCart/>
                        </Badge>
                    }
                                            onClick={() => handleBasketDrawer(true)}/>


                    {user ? (
                        <BottomNavigationAction label="Account" icon={<AccountCircle/>}
                                                onClick={() => handleUserDrawer(true)}/>
                    ) : (
                        <BottomNavigationAction label="Account" icon={<AccountCircle/>} component={Link} to={"/login"}/>
                    )}
                </BottomNavigation>
            </Paper>

            <Drawer sx={{
                "& 	.MuiDrawer-paper": {
                    backgroundColor: "rgba(0,0,0,.9)",
                }
            }} variant={"temporary"} transitionDuration={500} anchor={"bottom"} open={open.menu}
                    onClose={() => handleMenuDrawer(false)}>
                <Container sx={{py: 2}}>
                    <IconButton sx={{width: "100%", ml: 'auto'}} onClick={() => handleMenuDrawer(false)}>
                        <ExpandMore/>
                    </IconButton>
                    <PagesList/>
                </Container>
            </Drawer>


            <Drawer sx={{
                "& 	.MuiDrawer-paper": {
                    backgroundColor: "rgba(0,0,0,.9)",
                }
            }} variant={"temporary"} transitionDuration={500} anchor={"bottom"} open={open.user}
                    onClose={() => handleUserDrawer(false)}>
                <Container sx={{py: 2}}>
                    <IconButton sx={{width: "100%", ml: 'auto'}} onClick={() => handleUserDrawer(false)}>
                        <ExpandMore/>
                    </IconButton>
                    <UserLinkList onClick={() => handleUserDrawer(false)}/>
                </Container>
            </Drawer>

            <Drawer sx={{
                "& 	.MuiDrawer-paper": {
                    backgroundColor: "white",
                    color: "black"
                }
            }} variant={"temporary"} transitionDuration={500} anchor={"right"} open={open.basket}
                    onClose={() => handleBasketDrawer(false)}>
                <BasketMenu onClose={() => handleBasketDrawer(false)}/>
            </Drawer>
        </Box>

    )
}