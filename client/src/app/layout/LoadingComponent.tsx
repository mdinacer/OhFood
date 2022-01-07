import { Backdrop, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
    message?: string;
}

export default function LoadingComponent({ message = "Loading" }: Props) {
    return (
        <Backdrop open={true} invisible={false}>
            <Box
                className={"loading"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" width={"100%"}
            >
                <div>
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
                <Typography
                    textAlign={"center"}
                    variant="h6"
                    sx={{
                        justifyContent: "center",
                        position: "fixed",
                        top: "60%",
                        color: "white",
                        textTransform: "uppercase"
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
}
