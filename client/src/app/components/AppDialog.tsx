import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
    open: boolean;
    okText?: string | null;
    cancelText?: string | null;
    title: string;
    body: string;
    onClose: (value: boolean) => void;
    onCloseAsync?: () => Promise<boolean>;
}

export default function AppDialog({ open, title, body, okText = "Ok", cancelText = "Cancel", onClose }: Props) {
    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={onClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size="small" variant="outlined" onClick={() => onClose(false)}>{cancelText}</Button>
                    <Button size="small" variant="contained" onClick={() => onClose(true)}>{okText}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}