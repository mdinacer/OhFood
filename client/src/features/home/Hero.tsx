import {Box, Container, Typography} from "@mui/material";
import "./Hero.scss";

export default function Hero() {
    return (
        <Box
            component="div"
            sx={{
                position: "relative",
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
            }}
            className="hero"
        >


            <Box
                component="video"
                loop
                autoPlay
                muted
                className="hero-video"
                poster="/images/hero/hero.webp"
                src="/videos/hero_low.mp4"
                sx={{
                    display: {xs: "none", md: "block"},
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                }}
            />

            <Box
                component="img"
                className="hero-image"
                src="/images/hero/hero.webp"
                alt="hero"
                sx={{
                    display: {xs: "block", md: "none"},
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                }}
            />

            <Box
                className="overlay"
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                }}
            />

            <Container
                sx={{
                    mb: 5,
                    py: 2,
                }}
                className="text"
            >
                <Typography variant="h1" gutterBottom>
                    Never Stop
                </Typography>
                <Typography variant="h3" gutterBottom>
                    <span className="explore-text">Exploring</span> the tastes
                </Typography>
                <Typography variant="body1" gutterBottom sx={{maxWidth: "500px"}}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque
                    commodi maxime a quo voluptate aliquam ipsa sapiente obcaecati fuga
                    amet!
                </Typography>
                {/*<Button disableElevation variant="contained" href="#menu">*/}
                {/*    Explore*/}
                {/*</Button>*/}
            </Container>
        </Box>
    );
}
