import { Box, Container, CssBaseline, Divider, ThemeProvider, Typography } from "@mui/material";
import { LightTheme } from "../../app/layout/App";
import ProfileUserInfo from "./ProfileUserInfo";
import { lazy, Suspense } from "react";

const ProfileAddress = lazy(() => import("./ProfileAddress"));
const ProfileOrders = lazy(() => import("./ProfileOrders"));

export default function ProfilePage() {


    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Box sx={{
                pb: { xs: "60px" },
                height: "100%",
                width: "100%",
                backgroundColor: "#EEEEEE",
                minHeight: "100Vh",
                color: "black",
            }}>
                <Container sx={{ py: { md: 5, xs: 2 }, pt: { md: 10, xs: 2 } }}>
                    <Typography variant={"h4"} component={"h1"}
                        sx={{ pb: 3, textTransform: "uppercase" }}>Profile</Typography>
                    <ProfileUserInfo />

                    <Divider sx={{ my: 3 }} />

                    <Suspense fallback={<div />}>
                        <ProfileAddress />
                    </Suspense>


                    <Divider sx={{ my: 3 }} />

                    <Suspense fallback={<div />}>
                        <ProfileOrders />
                    </Suspense>
                </Container>
            </Box>
        </ThemeProvider>
    )
}