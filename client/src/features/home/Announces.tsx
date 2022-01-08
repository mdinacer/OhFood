import { Box, CircularProgress, Collapse, Container, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./Announces.scss";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Announce } from "../../app/models/announce";
import { useEffect } from "react";
import { fetchAnnouncesAsync } from "../../app/slices/announceSlice";

interface ItemProps {
    announce: Announce;
}

export default function Announces() {
    const { announces, announcesLoaded } = useAppSelector((state) => state.announce);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!announcesLoaded) {
            dispatch(fetchAnnouncesAsync())
        }
    }, [announcesLoaded, dispatch])

    function Item({ announce }: ItemProps) {
        return (
            <Box
                className="item-container"
                sx={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    borderRadius: { xs: 2, md: 3 },
                }}
            >
                <Box
                    className="item-img"
                    component="img"
                    src={announce.pictureUrl}
                />
                <Container
                    className="text-container"
                    sx={{
                        color: "white",
                        my: 4,
                    }}
                >
                    <h2>{announce.title}</h2>
                    <p>
                        {announce.description}
                    </p>
                </Container>
            </Box>
        );
    }

    if (!announcesLoaded) return <LoadingComponent message="Loading Services..." />;
    return (
        <Box className="announces">
            <Container sx={{ pt: { xs: 2, md: 7 } }}>
                <Typography
                    variant="h3"
                    sx={{
                        textTransform: "uppercase",
                    }}
                >
                    Our Services
                </Typography>
                <Box sx={{ overflow: "hidden", py: 3 }}>
                    <Carousel>
                        {announces.map((announce, i) => (
                            <Item key={i} announce={announce} />
                        ))}
                    </Carousel>
                </Box>
            </Container>
        </Box>
    );
}

