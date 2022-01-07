import { Box, Button, Container, CssBaseline, Divider, Grid, ThemeProvider, Typography } from "@mui/material";
import { LightTheme } from "../../app/layout/App";
import OrdersTable from "./OrdersTable";
import ProfileAddress from "./ProfileAddress";
import ProfileUserInfo from "./ProfileUserInfo";
import { useAppDispatch } from "../../app/store/configureStore";
import { addNotification } from "../../app/slices/notificationHubSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const [id, setId] = useState(0)

    const addFakeNotification = () => {
        setId(id + 1);
        dispatch(addNotification({ id: id, type: "Order Update", message: "Your order is ready" }))
    }

    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <Box sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#EEEEEE",
                minHeight: "100Vh",
                color: "black",
            }}>
                <Container sx={{ py: { md: 5, xs: 2 }, pt: { md: 10, xs: 2 } }}>
                    <Typography variant={"h4"} component={"h1"}
                        sx={{ pb: 4, textTransform: "uppercase" }}>Profile</Typography>

                    <Box sx={{ py: 2 }}>
                        <Container>
                            <Grid container spacing={1} rowGap={1}>
                                <Grid item xs={12} md={6}>
                                    <ProfileUserInfo />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <ProfileAddress />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                    <Divider />


                    <Button component={Link} to="/profile/orders/">See Orders</Button>
                </Container>
            </Box>
        </ThemeProvider>
    )
}