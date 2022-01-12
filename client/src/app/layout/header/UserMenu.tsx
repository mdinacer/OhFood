import {AccountCircle, Article, Dashboard, Logout, ManageAccounts, MenuBook, Person} from "@mui/icons-material";
import {Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip,} from "@mui/material";
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
    {title: "Orders", path: "/profile/orders", icon: <Article fontSize="small"/>},
    {title: "Address Book", path: "/profile/addresses", icon: <MenuBook fontSize="small"/>},
    {title: "Account Settings", path: "/profile/settings", icon: <ManageAccounts fontSize="small"/>},
    //{title: "Dashboard", path: "/admin", icon: <Dashboard fontSize="small"/>},
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
                    <MenuItem key={title} component={Link} to={path} onClick={handleCloseUserMenu} >
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText>{title}</ListItemText>

                    </MenuItem>
                ))}
                <Divider flexItem/>
                <MenuItem onClick={() => {
                    dispatch(signOut());
                    dispatch(clearBasket());
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>

                </MenuItem>

            </Menu>
        </Box>
    );
}
