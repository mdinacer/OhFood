import {TablePagination} from "@mui/material";
import {MetaData} from "../../../app/models/pagination";
import {ProductParams} from "../../../app/models/product";
import {ChangeEvent} from "react";
import {setPageNumber, setProductParams} from "../../../app/slices/catalogSlice";
import {useAppDispatch} from "../../../app/store/configureStore";

interface Props {
    metaData: MetaData;
    productParams: ProductParams;
}

export default function AdminProductsTablePagination({metaData, productParams}: Props){
    const dispatch = useAppDispatch();

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setProductParams({...productParams, pageSize: +event.target.value, pageNumber: 1}));
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPageNumber({pageNumber: newPage + 1}))
    };
    return (
        <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={metaData.totalCount}
            rowsPerPage={productParams.pageSize}
            page={metaData.currentPage - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}