import {List, ListItem, ListItemText} from "@mui/material";
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
        <List
            sx={{
                display: "flex",
                flexDirection:{xs:"column", md:"row"},
                mx: "auto",
            }}
        >
            {pages.map((page) => (
                <ListItem
                    key={page.path}
                    component={NavLink}
                    selected={pathname === page.path}

                    to={page.path}
                    sx={{
                        py: {xs:"inherit", md:0},
                        my:  {xs:"inherit", md:0},
                        width: "auto",
                        color: "white",
                        display: "block",
                        textTransform: "uppercase",
                    }}
                >
                    <ListItemText color={"danger"} primary={page.title}/>
                </ListItem>
            ))}
        </List>
    )
}