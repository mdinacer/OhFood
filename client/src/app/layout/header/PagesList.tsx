import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";
import React from "react";
import {useAppSelector} from "../../store/configureStore";

const pages = [
    {title: "Home", path: "/"},
    {title: "Menu", path: "/menu"},
    {title: "Gallery", path: "/gallery"},
    {title: "Contact", path: "/contact"},
    {title: "About us", path: "/about"},
    // {title: "Profile", path: "/profile"},
];


export default function PagesList() {
    const {user} = useAppSelector((state) => state.account);
    const {pathname} = useLocation()
    const isAdmin = user && user.roles ? user.roles.some(r => r === "Admin") : false;

    return (
        <Box className={"pages-list"}>
            <List
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", md: "row"},
                    mx: "auto",
                    py: {md: 0, xs: 1}
                }}
            >
                {pages.map((page) => (
                    <ListItem
                        key={page.path}
                        component={NavLink}
                        selected={pathname === page.path}
                        to={page.path}
                        sx={{
                            py: {xs: "inherit", md: 0},
                            my: {xs: "inherit", md: 0},
                            width: "auto",
                            color: "white",
                            display: "block",
                        }}
                    >
                        <ListItemText primary={
                            <Typography>{page.title}</Typography>
                        }/>
                    </ListItem>
                ))}

                <ListItem
                    key={"/admin"}
                    component={NavLink}
                    selected={pathname === "/admin"}
                    to={"/admin"}
                    sx={{
                        py: {xs: "inherit", md: 0},
                        my: {xs: "inherit", md: 0},
                        width: "auto",
                        color: "white",
                        display: "block",
                    }}
                >
                    {isAdmin &&
                        <ListItemText primary={
                            <Typography>Admin Panel</Typography>
                        }/>
                    }
                </ListItem>
            </List>
        </Box>

    )
}