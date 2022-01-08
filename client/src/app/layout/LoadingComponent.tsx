import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingAnimation from "./LoadingAnimation";

interface Props {
    message?: string;
    fullScreen?: boolean
}

export default function LoadingComponent({ fullScreen = false, message = "Loading" }: Props) {
    return (

        <Box
            className={"loading"}
            sx={{
                minHeight: fullScreen ? "100vh" : "50vh",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,.7)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >


            <LoadingAnimation />
            <Typography
                textAlign={"center"}
                variant="h6"
                sx={{
                    mb: 5,
                    color: "white",
                    textTransform: "uppercase"
                }}
            >
                {message}
            </Typography>

        </Box>
    );
}
