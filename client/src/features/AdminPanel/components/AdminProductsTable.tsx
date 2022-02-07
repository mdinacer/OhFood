import {styled} from "@mui/material/styles";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {currencyFormat} from "../../../app/util/util";
import {Cancel, Edit} from "@mui/icons-material";
import {Product} from "../../../app/models/product";
import {useState} from "react";
import agent from "../../../app/api/agent";
import {removeProduct} from "../../../app/slices/catalogSlice";
import {useAppDispatch} from "../../../app/store/configureStore";

interface Props {
    products: Product[];
    openForm: (product: Product) => void;
}

export default function AdminProductsTable({products, openForm}: Props) {
    const dispatch = useAppDispatch();
    const [busy, setBusy] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Product | undefined>(undefined);
    const [open, setOpen] = useState(false);

    function handleDeleteProduct() {
        if (deleteTarget) {
            setBusy(true);
            agent.Admin.deleteProduct(deleteTarget.id)
                .then(() => dispatch(removeProduct(deleteTarget.id)))
                .catch(error => console.log(error))
                .finally(() => {
                    setBusy(false);
                    setDeleteTarget(undefined);
                });
        }
    }

    const handleClose = () => {
        setOpen(false);
        setDeleteTarget(undefined);
    }


    return (
        <>
            <TableContainer>
                <Table stickyHeader size={"small"} aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{display: {xs: "none", md: "table-cell"}}}>ID</StyledTableCell>
                            <StyledTableCell sx={{display: {xs: "none", md: "table-cell"}}}/>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Price</StyledTableCell>
                            <StyledTableCell width={4}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <StyledTableRow
                                key={product.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <StyledTableCell sx={{display: {xs: "none", md: "table-cell"}}} component="th"
                                                 scope="row">
                                    {product.id}
                                </StyledTableCell>

                                <StyledTableCell sx={{display: {xs: "none", md: "table-cell"}}}>
                                    <Box component={"img"} src={product.pictureUrl} alt={product.name}
                                         sx={{
                                             height: "40px",
                                             width: "40px",
                                             objectFit: "contain"
                                         }}
                                    />
                                </StyledTableCell>

                                <StyledTableCell>{product.name}</StyledTableCell>
                                <StyledTableCell>{product.category}</StyledTableCell>
                                <StyledTableCell>{currencyFormat(product.price, "$")}</StyledTableCell>
                                <StyledTableCell>
                                    <Stack sx={{flexDirection: {xs: "column", md: "row"}}}
                                           justifyContent={"space-evenly"}
                                           alignItems={"center"}>
                                        <Tooltip title={"Edit"}>
                                            <IconButton onClick={() => openForm(product)}>
                                                <Edit/>
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={"Delete"}>
                                            <IconButton
                                                disabled={busy && deleteTarget?.id === product.id}
                                                onClick={() => {
                                                    setDeleteTarget(product);
                                                    setOpen(true);
                                                }}>
                                                <Cancel/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog

                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <Box sx={{p:3}}>
                  <DialogTitle id="alert-dialog-title">
                      {`Delete ${deleteTarget?.name}`}
                  </DialogTitle>
                  <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                          {`This will delete ${deleteTarget?.name} permanently, are you sure you want to proceed?`}
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                      <Button disableElevation onClick={() => handleDeleteProduct()} color={"error"} variant={"contained"}>YES</Button>
                      <Button variant={"outlined"} color={"inherit"} onClick={handleClose} autoFocus>
                          No
                      </Button>
                  </DialogActions>
              </Box>
            </Dialog>
        </>

    )
}

const StyledTableCell = styled(TableCell)(({theme}) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {

        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 1,
    },
}));