import {InputAdornment, TextField} from "@mui/material";
import {useController, UseControllerProps} from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    currency: string,
}

export default function AppCurrencyInput(props: Props) {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <TextField

            InputProps={{
                startAdornment: <InputAdornment position={"start"}>{props.currency}</InputAdornment>,
            }}
            {...props}
            {...field}

            multiline={props.multiline}
            rows={props.rows}
            type={props.type}
            fullWidth
            size={"small"}
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    )
}