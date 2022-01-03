import {Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {format} from 'date-fns'
import useOrders from "../../../app/hooks/useOrders";
import {useAppDispatch, useAppSelector} from "../../../app/store/configureStore";
import AppPagination from "../../../app/components/AppPagination";
import {setPageNumber, updateOrder} from "../../../app/slices/orderSlice";
import {DoDisturb, Recommend} from "@mui/icons-material";
import {useState} from "react";
import agent from "../../../app/api/agent";
import {LoadingButton} from "@mui/lab";
import {OrderStatus} from "../../../app/models/order";

const orderStatus = [
    {name: "Pending", value: 0, color: "orange"},
    {name: "Confirmed", value: 1, color: "green"},
    {name: "Delivered", value: 2, color: "green"},
    {name: "Cancelled", value: 3, color: "red"},
]


export default function AdminOrdersPage() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
    const {orders, ordersLoaded, metaData} = useOrders();
    const {orderParams,} = useAppSelector(state => state.order);


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


    if (!ordersLoaded) return <div>Loading Orders</div>

    return (
        <>
            <Box>
                <Typography variant={"h3"} component={"h1"}>Orders</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Ship To</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{format(new Date(order.orderDate), 'MM/dd/yyyy HH:mm')}</TableCell>
                                <TableCell>{order.shippingAddress.fullName}</TableCell>
                                <TableCell>{order.shippingAddress.address1} - {order.shippingAddress.city}</TableCell>
                                <TableCell>
                                    {order.status}
                                </TableCell>
                                <TableCell align="right">{`$${order.total}`}</TableCell>
                                <TableCell align="right">
                                    <Stack direction={"row"} justifyContent={"space-around"}>
                                        <LoadingButton
                                            onClick={() => updateOrderStatus(order.id, "Confirmed")}
                                            loading={loading && target === order.id} disableElevation
                                            disabled={order.status !== "Pending"} size={"small"}
                                            variant={"contained"} color={"success"}>
                                            <Recommend/>
                                        </LoadingButton>
                                        <LoadingButton
                                            onClick={() => updateOrderStatus(order.id, "Cancelled")}
                                            loading={loading && target === order.id} disableElevation
                                            disabled={order.status === "Cancelled"} size={"small"}
                                            variant={"contained"} color={"error"}>
                                            <DoDisturb/>
                                        </LoadingButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box>
                    {metaData &&
                        <AppPagination
                            metaData={metaData}
                            onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                        />}
                </Box>
            </Box>
        </>
    )
}