import { Box, Button, Container, Stack, Typography, useMediaQuery } from "@mui/material";
import "./Hero.scss";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export default function Hero() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Box component="div" className="hero"
            sx={{
                alignItems: { xs: "center", sm: "flex-end" },
                pt: { xs: 2, md: 7 },
                pb: { xs: 7, md: 2 },
            }}
        >
            {!isMobile && (
                <>
                    <Box
                        component="video"
                        loop
                        autoPlay
                        muted
                        className="hero-video"
                        poster="/images/hero/hero.webp"
                        src="/videos/hero_low.mp4"
                    />
                    <Box component="div" className="overlay" />
                </>
            )}



            <Container
                sx={{
                    mb: 3,
                    py: 2,
                }}
                className="text-container"
            >
                <Typography variant="h1" component={"h1"} >
                    Never Stop
                </Typography>
                <Typography variant="h4" component={"h3"} gutterBottom>
                    Exploring the tastes
                </Typography>

                <Stack direction="row" sx={{ my: 2, ml: 2 }}>
                    <Button size={"small"} className={"exploreButton"}  color="inherit" disableElevation variant="outlined" href="#menu">
                        Explore
                    </Button>
                    <Button size={"small"} className={"callToAction"} component={Link} to="/menu" sx={{ mx: 2, color: "inherit" }} disableElevation variant="contained">
                        Order
                    </Button>
                </Stack>
            </Container>
        </Box >
    );
}
