import {Backdrop, Typography} from "@mui/material";
import {Box} from "@mui/system";

interface Props {
    message?: string;
}

export default function LoadingComponent({message = "Loading"}: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box
                className={"loading"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh" width={"10M%"}
            >
                <div>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>
                <Typography
                    variant="h4"
                    sx={{
                        justifyContent: "center",
                        position: "fixed",
                        top: "60%",
                        color: "white",
                        textTransform:"uppercase"
                    }}
                >
                    {message}
                </Typography>
            </Box>
        </Backdrop>
    );
}
