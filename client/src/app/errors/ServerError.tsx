import {Box, Typography} from "@mui/material";

export default function ServerError() {
    return (
        <Box sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Typography variant="h1" gutterBottom sx={{color: "white"}}>
                Internal Server Error
            </Typography>
        </Box>
    );
}
