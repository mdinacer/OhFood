import {
    Box,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store/configureStore";
import {fetchAllOrdersAsync, orderSelectors} from "../../app/slices/orderSlice";
import {format} from "date-fns";
import {currencyFormat} from "../../app/util/util";
import {Cancel, CheckCircle, KeyboardArrowDown, KeyboardArrowUp, RemoveCircle} from "@mui/icons-material";
import {Order} from "../../app/models/order";
import agent from "../../app/api/agent";

type OrderStatus = "Cancelled" | "Confirmed";

export default function AdminOrdersPage() {
    const orders = useAppSelector(orderSelectors.selectAll);
    const {
        ordersLoaded,
        metaData,
    } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (!ordersLoaded) {
            dispatch(fetchAllOrdersAsync());
            console.log(metaData)
        }
    }, [dispatch, metaData, ordersLoaded]);


    return (
        <Box>
            <Typography variant={"h1"}>{orders.length}</Typography>
            <Paper sx={{width: '100%', overflow: 'hidden'}}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>ID</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <Row key={order.id} order={order}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {metaData && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={metaData.totalCount}
                        rowsPerPage={metaData.pageSize}
                        page={metaData.currentPage - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
        </Box>
    )
}

interface RowProps {
    order: Order
}

function Row({order}: RowProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const resetOrderStatus = (id: number) => updateOrderStatus(id, "Pending");
    const cancelOrder = (id: number) => updateOrderStatus(id, "Cancelled");
    const confirmOrder = (id: number) => updateOrderStatus(id, "Confirmed");


    function updateOrderStatus(id: number, status: string) {
        setLoading(true);
        agent.Admin.updateOrderStatus(id, status).then(
            (response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => setLoading(false));
    }

    return (
        <>
            <TableRow
                key={order.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {order.id}
                </TableCell>
                <TableCell>{format(new Date(order.orderDate), "dd/MM/yy")}</TableCell>

                <TableCell>{order.shippingAddress.fullName}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{currencyFormat(order.total, "$")}</TableCell>
                <TableCell width={4}>
                    <Stack sx={{width: "100%"}} justifyContent={"space-evenly"} direction={"row"} alignItems={"center"}>
                        <Tooltip title="Confirm order">
                            <IconButton onClick={() => confirmOrder(order.id)} color={"success"}
                                        disabled={order.status !== "Pending"}>
                                <CheckCircle/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel order">
                            <IconButton disabled={order.status === "Cancelled"} color={"warning"}
                                        onClick={() => cancelOrder(order.id)}>
                                <RemoveCircle/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete order">
                            <IconButton color={"error"} onClick={() => cancelOrder(order.id)}>
                                <Cancel/>
                            </IconButton>
                        </Tooltip>


                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 5, paddingTop: 0, width: "100%"}} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1, width: "100%"}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Order Details
                            </Typography>
                            <Typography variant="body2" gutterBottom component="div">
                                Deliver to: {order.shippingAddress.address1}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Unit price ($)</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.items.map((item) => (
                                        <TableRow key={item.name}
                                                  sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="center">
                                                {item.quantity}
                                            </TableCell>
                                            <TableCell align="right">
                                                {currencyFormat(item.price, "$")}
                                            </TableCell>
                                            <TableCell align="right">
                                                {currencyFormat(item.price * item.quantity, "$")}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}