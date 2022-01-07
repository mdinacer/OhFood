import {Badge, Box, IconButton, ListItemText, Menu, MenuItem} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../store/configureStore";
import {useState} from "react";
import {Notifications, NotificationsActive} from "@mui/icons-material";
import {notificationSelectors} from "../../slices/notificationHubSlice";

export default function NotificationMenu() {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(notificationSelectors.selectAll);
    const [anchorElUser, setAnchorElUser] = useState<null | any>(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{flexGrow: 0}} className={"user-menu"}>
            <IconButton onClick={handleOpenUserMenu} color="inherit" size="small">
                <Badge badgeContent={notifications.length} color="error">
                    {notifications.length > 0 ? (
                        <NotificationsActive/>
                    ) : (
                        <Notifications/>
                    )}
                </Badge>
            </IconButton>
            <Menu
                sx={{mt: {xs: 0, md: "45px"}}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >

                {notifications.map(({id, type, message}) => (
                    <MenuItem key={id} onClick={handleCloseUserMenu}>

                        <ListItemText>{message}</ListItemText>

                    </MenuItem>
                ))}

            </Menu>
        </Box>
    );
}