import {ThemeProvider} from "@emotion/react";
import {Box, Container, CssBaseline, Paper, Typography} from "@mui/material";
import {LightTheme} from "../../app/layout/App";
import {useAppSelector} from "../../app/store/configureStore";
import ProfileForm from "./ProfileForm";

export default function ProfileSettings() {
    const {user, profile} = useAppSelector(state => state.account);


    if (!user || !profile) return <div>No User</div>
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline/>
            <Box sx={{
                pt: {md: "60px", xs: 1},
                pb: {xs: "60px", md: 1},
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#EEEEEE",
            }}>
                <Container sx={{
                    px: {xs: 0, md: 7},
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <Paper sx={{
                        p: 3,
                        width: "100%",
                        height: "100%",
                        maxWidth: "800px",
                        borderRadius: {xs: 0, md: 3},

                    }}>
                        <Typography variant="h6" sx={{mb: 3}}>Profile Settings</Typography>
                        <ProfileForm/>
                    </Paper>


                </Container>

            </Box>
        </ThemeProvider>
    )
};
