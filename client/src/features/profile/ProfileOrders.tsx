import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
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
        <Grid item md={4} xs={12}>
            <Stack height="100%" direction={"row"} sx={{ justifyContent: { xs: "space-between", md: "space-around" } }} alignItems={"center"}>
                <Typography sx={{ textTransform: "uppercase" }} variant="caption">{title}</Typography>
                <Typography fontWeight={loading ? "normal" : "bold"} variant="subtitle1">{value}</Typography>
            </Stack>
            <Divider sx={{ mb: { xs: 2, md: 0 } }} />
        </Grid>
    )
    return (
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

                <Grid item md={4} xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        p: 0
                    }}>
                    <Button component={Link} to="/profile/orders" sx={{ my: 1, mt: { xs: 3, md: 1 } }} size={"small"} variant="outlined" color="inherit">
                        View Orders
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
};
