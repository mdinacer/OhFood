import {AccountCircle, Dashboard, Logout, ManageAccounts, Person} from "@mui/icons-material";
import {Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip,} from "@mui/material";
import {useState} from "react";
import {User} from "../../models/user";
import {Link} from "react-router-dom";
import "./Header.scss";
import {signOut} from "../../slices/accountSlice";
import {useAppDispatch} from "../../store/configureStore";
import {clearBasket} from "../../slices/basketSlice";

interface Props {
    user: User;
}

const userLinks = [
    {title: "Profile", path: "/profile", icon: <Person fontSize="small"/>},
    {title: "Account Settings", path: "/account", icon: <ManageAccounts fontSize="small"/>},
    {title: "Dashboard", path: "/admin", icon: <Dashboard fontSize="small"/>},
]


export default function UserMenu({user}: Props) {
    const dispatch = useAppDispatch();
    const [anchorElUser, setAnchorElUser] = useState<null | any>(null);

    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Box sx={{flexGrow: 0}} className={"user-menu"}>
            <Tooltip title={user.email}>
                <IconButton onClick={handleOpenUserMenu} color="inherit" size="small">
                    <AccountCircle/>
                </IconButton>
            </Tooltip>
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

                {userLinks.map(({title, path, icon}) => (
                    <MenuItem key={title} component={Link} to={path} onClick={handleCloseUserMenu} disabled>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText>{title}</ListItemText>

                    </MenuItem>
                ))}
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Déconnexion</ListItemText>

                </MenuItem>

            </Menu>
        </Box>
    );
}
