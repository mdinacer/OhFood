import * as React from "react";
import Box from "@mui/material/Box";
import PagesList from "./PagesList";

interface Props {
    anchor: string,
    toggleDrawer: (anchor: string, open: boolean) => (event: any) => void;
}

export default function HeaderDrawer({toggleDrawer, anchor}: Props) {

    return (
        <Box
            sx={{width: "auto"}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <PagesList/>
        </Box>
    );
}
