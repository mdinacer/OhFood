import {Box, Collapse, Container, Divider, Grid, List, ListItem, Paper, Stack, Typography} from "@mui/material";
import {useState} from "react";
import agent from "../../app/api/agent";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import useOrders from "../../app/hooks/useOrders";
import {format} from "date-fns";
import AppPagination from "../../app/components/AppPagination";
import {setPageNumber, updateOrder} from "../../app/slices/orderSlice";
import {currencyFormat} from "../../app/util/util";
import {DoDisturb, ExpandLessOutlined, ExpandMoreOutlined, Recommend} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

interface Props {
    isAdmin: boolean
}

export default function OrdersTable({isAdmin}: Props) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
    const {orders, ordersLoaded, metaData} = useOrders();
    const {orderParams,} = useAppSelector(state => state.order);
    const [collapsed, setCollapsed] = useState<{ id: number | null }>({id: null});

    function updateOrderStatus(entityId: number, value: string) {
        setLoading(true);
        setTarget(entityId);
        agent.Orders.updateStatus(entityId, value)
            .then(response => {
                console.log(response);
                dispatch(updateOrder({id: entityId, changes: {status: value}}))
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    }

    function getFlexDirection() {
        return isAdmin ? "row" : "column";
    }

    const handleCollapsed = (id: number) =>
        setCollapsed({id: collapsed.id === id ? null : id})


    if (!ordersLoaded) return <div>Loading Orders</div>

    return (
        <Box sx={{overflow: "auto", py: 3}}>

            <Typography variant={"h5"} component={"h2"} gutterBottom>Orders</Typography>
            <Grid container spacing={3}>
                {orders.map(order => (
                    <Grid item xs={12}>
                        <Paper sx={{py: 3, height: "100%"}}>
                            <Container sx={{display: "flex", flexDirection: getFlexDirection()}}>
                                <Grid container spacing={1}>
                                    <Grid item md={3} xs={12}>
                                        <Stack>
                                            <Typography variant={"caption"}>Date</Typography>
                                            <Typography
                                                variant={"body1"}>{format(new Date(order.orderDate), "dd/MM/yy HH:mm")}</Typography>
                                        </Stack>
                                    </Grid>

                                    <Grid item md={5} xs={12}>
                                        <Stack>
                                            <Typography variant={"caption"}>Address</Typography>
                                            <Typography variant={"body1"}>
                                                {order.shippingAddress.address1} - {order.shippingAddress.city}
                                            </Typography>

                                        </Stack>
                                    </Grid>

                                    <Grid item md={2} xs={6}>
                                        <Typography variant={"caption"}>
                                            Status
                                        </Typography>
                                        <Typography variant={"body1"}>
                                            {order.status}
                                        </Typography>
                                    </Grid>

                                    <Grid item md={2} xs={6} display={"flex"} justifyContent={"flex-end"} flexDirection={"column"}>
                                        <Typography  variant={"caption"} textAlign={"right"}>
                                            Total
                                        </Typography>
                                        <Typography textAlign={"right"} variant={"body1"}>
                                            {currencyFormat(order.subtotal, "$")}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider/>
                                        {isAdmin ? (
                                            <Stack sx={{mt: 1}} direction={"row"} justifyContent={"space-evenly"}
                                                   flexWrap={"wrap"}>
                                                <LoadingButton size={"small"} color={"inherit"}
                                                               onClick={() => handleCollapsed(order.id)}
                                                               startIcon={
                                                                   collapsed.id !== order.id ? (
                                                                       <ExpandMoreOutlined fontSize="large"
                                                                                           color="primary"/>
                                                                   ) : (
                                                                       <ExpandLessOutlined fontSize="large"
                                                                                           color="inherit"/>
                                                                   )
                                                               }>
                                                    View
                                                </LoadingButton>
                                                <LoadingButton size={"small"} color={"success"}
                                                               startIcon={<Recommend/>}>
                                                    Confirm
                                                </LoadingButton>
                                                {order.status === "Pending" && (
                                                    <LoadingButton size={"small"} startIcon={<DoDisturb/>}
                                                                   color={"error"}>
                                                        Cancel
                                                    </LoadingButton>
                                                )}

                                            </Stack>
                                        ) : (
                                            <Stack
                                                sx={{mt: 1, justifyContent: {xs: "space-evenly", md: "space-between"}}}
                                                direction={"row"}>
                                                <LoadingButton color={"inherit"} startIcon={
                                                    collapsed.id !== order.id ? (
                                                        <ExpandMoreOutlined fontSize="large" color="primary"/>
                                                    ) : (
                                                        <ExpandLessOutlined fontSize="large" color="inherit"/>
                                                    )
                                                }
                                                               onClick={() => handleCollapsed(order.id)}>
                                                    View Items
                                                </LoadingButton>
                                                {order.status === "Pending" && (
                                                    <LoadingButton
                                                        onClick={() => updateOrderStatus(order.id, "Cancelled")}
                                                        startIcon={<DoDisturb/>}
                                                        color={"error"}>
                                                        Cancel
                                                    </LoadingButton>
                                                )}
                                            </Stack>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Collapse in={collapsed.id === order.id}>
                                            <Divider/>
                                            <List dense sx={{my: 1}}>
                                                {order.items.map(item => (
                                                    <ListItem key={item.productId}>
                                                        <Grid container>
                                                            <Grid item xs={8}>
                                                                <Typography variant={"body1"}>{item.name}</Typography>
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
                            onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                        />}
                </Grid>
            </Grid>

        </Box>
    )
}