import {Box, Container, CssBaseline, Grid, Paper, ThemeProvider, Typography} from "@mui/material";
import {LightTheme} from "../../app/layout/App";
import OrdersTable from "./OrdersTable";
import ProfileAddress from "./ProfileAddress";
import ProfileUserInfo from "./ProfileUserInfo";

export default function ProfilePage() {


    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline/>
            <Box sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#EEEEEE",
                color: "black",
            }}>
                <Container  sx={{ py: {md: 5, xs: 2}, pt: {md: 10, xs: 2} }}>
                    <Typography variant={"h4"} component={"h1"} gutterBottom>Profile</Typography>

                    <Paper sx={{py:2}}>
                       <Container>
                           <Grid container spacing={1} rowGap={1} >
                               <Grid item xs={12} md={6}>
                                   <ProfileUserInfo/>
                               </Grid>
                               <Grid item xs={12} md={6} >
                                   <ProfileAddress/>
                               </Grid>

                           </Grid>
                       </Container>
                    </Paper>

                    <OrdersTable isAdmin={false}/>


                </Container>
            </Box>
        </ThemeProvider>
    )
}