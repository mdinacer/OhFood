import { Pageview } from "@mui/icons-material";
import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { OrderTotals } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";

export default function ProfileOrders() {
    const [loading, setLoading] = useState(false)
    const [ordersTotals, setOrdersTotals] = useState<OrderTotals>({ count: 0, total: 0 });

    useEffect(() => {
        setLoading(true)
        agent.Orders
            .getTotals()
            .then(response => setOrdersTotals(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    const gridItem = (title: string, value: string | number) => (
        <Grid item md={6} xs={12}>
            <Stack height="100%" direction={"row"} sx={{ justifyContent: { xs: "space-between", md: "space-around" } }} alignItems={"center"}>
                <Typography sx={{ textTransform: "uppercase" }} variant="caption">{title}</Typography>
                <Typography fontWeight={loading ? "normal" : "bold"} variant="subtitle1">{value}</Typography>
            </Stack>
            <Divider sx={{ mb: { xs: 2, md: 0 } }} />
        </Grid>
    )
    return (
        <Box>

            <Stack my={3} direction="row" justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="h5" component="h2" >Orders</Typography>
                <Button sx={{ minWidth: '110px' }} component={Link} to="/profile/orders" startIcon={<Pageview />} variant="outlined" color="inherit" size="small">
                    View
                </Button>
            </Stack>
            <Paper sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <Typography textAlign="center" sx={{ textTransform: "uppercase" }} variant="caption">Orders Summary</Typography>
                <Grid container columnSpacing={3}>
                    {gridItem("Count", loading ? "Calculating" : ordersTotals.count)}
                    {gridItem("Total", loading ? "Calculating" : currencyFormat(ordersTotals.total, "$"))}


                </Grid>
            </Paper>

        </Box>

    )
};
