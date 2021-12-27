import {Box, IconButton, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface Props {
    quantity: number,
    increase : () => void,
    decrease: () => void,
    isRow:boolean,
    minValue: number;
    loading: boolean
}

export default function QuantityStepper({quantity, increase, decrease, isRow = true, loading, minValue=1}: Props){
    return (
        <Box display={"flex"} flexDirection={isRow ? "row": "column-reverse"} alignItems={"center"} color={"inherit"} justifyContent={"center"}>
            <IconButton   sx={{py:0}} color={"inherit"} onClick={decrease} disabled={loading || quantity === minValue}>
                <ExpandMore/>
            </IconButton>
            <Typography textAlign={"center"} minWidth={"3rem"} variant={"h6"}>{quantity}</Typography>
            <IconButton disabled={loading} sx={{p:0}}  color={"inherit"} onClick={increase}>
                <ExpandLess />
            </IconButton>

        </Box>
    )
}