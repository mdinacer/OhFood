import {Article, Dashboard, Logout, ManageAccounts, MenuBook, Person} from "@mui/icons-material";
import {List, ListItem, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";
import {signOut} from "../../slices/accountSlice";
import {clearBasket} from "../../slices/basketSlice";
import {useAppDispatch} from "../../store/configureStore";

interface Props {
    onClick: (value: boolean) => void;
}

const userLinks = [
    {title: "Profile", path: "/profile", icon: <Person fontSize="small"/>},
    {title: "Orders", path: "/profile/orders", icon: <Article fontSize="small"/>},
    {title: "Address Book", path: "/profile/addresses", icon: <MenuBook fontSize="small"/>},
    {title: "Account Settings", path: "/profile/settings", icon: <ManageAccounts fontSize="small"/>},
    //{title: "Dashboard", path: "/admin", icon: <Dashboard fontSize="small"/>},
]

export default function UserLinkList({onClick}: Props) {
    const dispatch = useAppDispatch();
    return (
        <List>
            {userLinks.map(({title, path, icon}) => (
                <ListItem sx={{
                    textDecoration: "none", color:"white"
                }} key={title} component={Link} to={path}  onClick={() => onClick(false)}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText>{title}  </ListItemText>
                </ListItem>
            ))}
            <MenuItem onClick={() => {
                dispatch(signOut());
                dispatch(clearBasket());
                onClick(false);
            }}>
                <ListItemIcon>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>

            </MenuItem>

        </List>
    )
}