import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import {NavLink, useLocation} from "react-router-dom";
import React from "react";

const pages = [
    {title: "Home", path: "/"},
    {title: "Menu", path: "/menu"},
    {title: "Gallery", path: "/gallery"},
    {title: "About us", path: "/about"},
    // {title: "Profile", path: "/profile"},
];


export default function PagesList() {
    const {pathname} = useLocation()
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
                            color:  "white",
                            display: "block",
                        }}
                    >
                        <ListItemText primary={
                            <Typography>{page.title}</Typography>
                        }/>
                    </ListItem>
                ))}
            </List>
        </Box>

    )
}