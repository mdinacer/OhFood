import { Box, Collapse, Container, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import useOrders from "../../app/hooks/useOrders";
import { format } from "date-fns";
import AppPagination from "../../app/components/AppPagination";
import { setPageNumber, updateOrder } from "../../app/slices/orderSlice";
import { currencyFormat } from "../../app/util/util";
import { DoDisturb, ExpandLessOutlined, ExpandMoreOutlined, Recommend } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import AppDialog from "../../app/components/AppDialog";

interface Props {
    isAdmin: boolean
}

export default function OrdersTable({ isAdmin }: Props) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
    const { orders, ordersLoaded, metaData } = useOrders();
    const [collapsed, setCollapsed] = useState<{ id: number | null }>({ id: null });
    const [open, setOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState<{ id: number, action: string } | null>(null)


    const cancelOrder = (id: number) => {
        setDialogAction({ id, action: "Cancelled" });
        setOpen(true);
    }
    const confirmOrder = (id: number) => updateOrderStatus(id, "Confirmed")

    //const resetPendingOrder = (id: number) => { updateOrderStatus(id, "Pending") }


    function handleDialogOnClose(value: boolean) {
        if (value && dialogAction) {
            updateOrderStatus(dialogAction.id, dialogAction.action);
        }
        setOpen(false);
    }


    function updateOrderStatus(entityId: number, value: string) {
        setLoading(true);
        setTarget(entityId);
        agent.Orders.updateStatus(entityId, value)
            .then(response => {
                dispatch(updateOrder({ id: entityId, changes: { status: value } }))
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    }

    const handleCollapsed = (id: number) =>
        setCollapsed({ id: collapsed.id === id ? null : id });

    const showMessage = (message: string = "Loading") => (
        <Box height={"100%"} width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant={"caption"}>{message}</Typography>
        </Box>
    )


    return (
        <Box sx={{ overflow: "auto", py: 3 }}>

            {!ordersLoaded && showMessage("Loading Orders")}

            {ordersLoaded && orders.length === 0 && showMessage("Your orders list is empty.")}

            {orders.length > 0 && (
                <Grid container spacing={3}>
                    {orders.map(order => (
                        <Grid key={order.id} item xs={12}>
                            <Paper sx={{ py: 3, height: "100%" }}>
                                <Container>
                                    <Grid container spacing={1}>
                                        <Grid item md={3} xs={12}>
                                            <Stack>
                                                <Typography variant={"caption"}>Order Date</Typography>
                                                <Typography
                                                    variant={"body1"}>{format(new Date(order.orderDate), "dd/MM/yy HH:mm")}</Typography>
                                            </Stack>
                                        </Grid>

                                        <Grid item md={5} xs={12}>
                                            <Stack>
                                                <Typography variant={"caption"}>Delivery Address</Typography>
                                                <Typography variant={"body1"}>
                                                    {order.shippingAddress.address1} - {order.shippingAddress.town ?? order.shippingAddress.suburb}
                                                </Typography>

                                            </Stack>
                                        </Grid>

                                        <Grid item md={2} xs={6}>
                                            <Typography variant={"caption"}>
                                                Order Status
                                            </Typography>
                                            <Typography variant={"body1"}>
                                                {order.status}
                                            </Typography>
                                        </Grid>

                                        <Grid item md={2} xs={6} display={"flex"} justifyContent={"flex-end"}
                                            flexDirection={"column"}>
                                            <Typography variant={"caption"} textAlign={"right"}>
                                                Total
                                            </Typography>
                                            <Typography textAlign={"right"} variant={"body1"}>
                                                {currencyFormat(order.subtotal, "$")}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Divider />
                                            {isAdmin ? (
                                                <Stack sx={{ mt: 1 }} direction={"row"} justifyContent={"space-evenly"}
                                                    flexWrap={"wrap"}>
                                                    <LoadingButton size={"small"} color={"inherit"}
                                                        onClick={() => handleCollapsed(order.id)}
                                                        startIcon={
                                                            collapsed.id !== order.id ? (
                                                                <ExpandMoreOutlined fontSize="large"
                                                                    color="primary" />
                                                            ) : (
                                                                <ExpandLessOutlined fontSize="large"
                                                                    color="inherit" />
                                                            )
                                                        }>
                                                        View
                                                    </LoadingButton>
                                                    <LoadingButton
                                                        onClick={() => confirmOrder(order.id)}
                                                        loading={loading && target === order.id}
                                                        size={"small"}
                                                        color={"success"}
                                                        startIcon={<Recommend />}>
                                                        Confirm
                                                    </LoadingButton>
                                                    {order.status === "Pending" && (
                                                        <LoadingButton
                                                            onClick={() => cancelOrder(order.id)}
                                                            loading={loading && target === order.id}
                                                            size={"small"}
                                                            startIcon={<DoDisturb />}
                                                            color={"error"}>
                                                            Cancel
                                                        </LoadingButton>
                                                    )}

                                                </Stack>
                                            ) : (
                                                <Stack
                                                    sx={{
                                                        mt: 1,
                                                        justifyContent: { xs: "space-evenly", md: "space-between" }
                                                    }}
                                                    direction={"row"}>
                                                    <LoadingButton color={"inherit"} startIcon={
                                                        collapsed.id !== order.id ? (
                                                            <ExpandMoreOutlined fontSize="large" color="primary" />
                                                        ) : (
                                                            <ExpandLessOutlined fontSize="large" color="inherit" />
                                                        )
                                                    }
                                                        onClick={() => handleCollapsed(order.id)}>
                                                        View Items
                                                    </LoadingButton>
                                                    {order.status === "Pending" && (
                                                        <LoadingButton
                                                            onClick={() => cancelOrder(order.id)}
                                                            loading={loading && target === order.id}
                                                            startIcon={<DoDisturb />}
                                                            color={"error"}>
                                                            Cancel
                                                        </LoadingButton>
                                                    )}
                                                </Stack>
                                            )}
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Collapse in={collapsed.id === order.id}>
                                                <Divider />
                                                <List dense sx={{ my: 1 }}>
                                                    {order.items.map(item => (
                                                        <ListItem key={item.productId}>
                                                            <Grid container>
                                                                <Grid item xs={8}>
                                                                    <Typography
                                                                        variant={"body1"}>{item.name}</Typography>
                                                                </Grid>

                                                                <Grid item xs={2} display={"flex"} flexDirection={"row"}
                                                                    alignItems={"center"} justifyContent={"center"}>
                                                                    <Typography variant={"body2"}>x </Typography>
                                                                    <Typography
                                                                        variant={"body1"}>{item.quantity}</Typography>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Typography variant={"body1"}
                                                                        textAlign={"right"}>{currencyFormat(item.price * item.quantity, "$")}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Paper>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        {metaData &&
                            <AppPagination
                                metaData={metaData}
                                onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                            />}
                    </Grid>
                </Grid>
            )
            }

            <AppDialog
                open={open}
                title="Cancel Order"
                onClose={handleDialogOnClose}
                body={"Are you sure you want to cancel this order?"}
            />

        </Box >
    )
}