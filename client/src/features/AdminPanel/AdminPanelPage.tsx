import * as React from 'react';
import {ThemeProvider} from "@emotion/react";
import {Container, CssBaseline} from "@mui/material";
import {Outlet} from "react-router-dom";
import {LightTheme} from "../../app/layout/App";
import AdminPageHeader from "./header/AdminPageHeader";
import useSignalR from "../../app/hooks/useSignalR";


export default function AdminPanelPage() {
    const {connection} = useSignalR("AdminPanel")
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline/>
            <AdminPageHeader/>
            <Container sx={{overflow: "auto"}}>
                <Outlet/>
            </Container>
        </ThemeProvider>

    );
}