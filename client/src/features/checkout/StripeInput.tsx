import {InputBaseComponentProps} from "@mui/material";
import {forwardRef, Ref, useImperativeHandle, useRef} from "react";

interface Props extends InputBaseComponentProps {
}

const cardElementOptions = {
    style: {
        base: {
            color: "white",
        }
    }
}

export const StripeInput = forwardRef(function StripeInput({component: Component, ...props}: Props,
                                                           ref: Ref<unknown>) {
    const elementRef = useRef<any>();

    useImperativeHandle(ref, () => ({
        focus: () => elementRef.current.focus
    }));

    return (
        <Component options={cardElementOptions}
            onReady={(element: any) => elementRef.current = element}
            {...props}
        />
    )
});