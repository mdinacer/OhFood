import {Pagination, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useState} from "react";
import {MetaData} from "../models/pagination";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

export default function AppPagination({metaData, onPageChange}: Props) {
    const {currentPage, totalCount, totalPages, pageSize} = metaData;
    const [pageNumber, setPageNumber] = useState(currentPage);

    function handlePageChange(page: number) {
        setPageNumber(page);
        onPageChange(page);
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'  width={"100%"} sx={{flexDirection:{xs:"column", md:"row"} , my:3}}>
            <Typography variant={"body2"} gutterBottom>
                Affichage {(currentPage - 1) * pageSize + 1} à {currentPage * pageSize > totalCount
                    ? totalCount
                    : currentPage * pageSize} de {totalCount} éléments
            </Typography>
            {metaData && metaData.totalPages > 1 && (
                <Pagination sx={{flexWrap:"nowrap", mb: {xs:7, md:1}, mt:{xs:2,md:0}}}
                    color='primary'
                    size='medium'
                    count={totalPages}
                    page={pageNumber}
                    defaultPage={1}
                    siblingCount={1}
                    onChange={(e, page) => handlePageChange(page)}
                />
            )}
        </Box>
    )
}