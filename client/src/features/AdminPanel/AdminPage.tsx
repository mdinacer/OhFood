import {CssBaseline, ThemeProvider} from "@mui/material";
import {Outlet} from "react-router-dom";
import {LightTheme} from "../../app/layout/App";
import AdminHeader from "./AdminHeader";

export default function AdminPage() {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline/>

            <AdminHeader>
                <Outlet/>
            </AdminHeader>
        </ThemeProvider>
    )
}