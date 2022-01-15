import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import OrdersTable from "./OrdersTable";

export default function ProfileOrdersPage() {


    return (
        <Box sx={{
            height: "100%",
            width: "100%",
            minHeight: "100Vh",
        }}>
            <Container sx={{py: {md: 5, xs: 2}, pt: {md: 10, xs: 2}}}>
                <Stack sx={{width: "100%", pb: 4}} display={"flex"} flexDirection="row" alignItems="center"
                       justifyContent="space-between">
                    <Typography
                        variant={"h4"}
                        component={"h1"}
                        sx={{textTransform: "uppercase"}}
                    >
                        Orders
                    </Typography>

                    <Button variant="text" color="inherit" size="small" component={Link} to="/profile">
                        Back to profile
                    </Button>
                </Stack>
                <OrdersTable/>
            </Container>
        </Box>
    )
}