import {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

const pages = [
    {title: "Dashboard", path: "dashboard"},
    {title: "Orders", path: "orders"},
    {title: "Customers", path: "customers"},
    {title: "Products", path: "Products"},
    {title: "Announces", path: "Announces"},
];


export default function AdminPageHeader() {
    const [open, setOpen] = useState(false);

    return (
        <AppBar position="static">
            <Container>
                <Toolbar variant={"dense"} disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setOpen(true)}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor={"left"}
                            variant={"temporary"}
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <List>
                                {pages.map(({title, path}) => (
                                    <ListItem key={path} onClick={() => setOpen(false)}>
                                        <ListItemButton component={Link} to={path}>
                                            <Typography textAlign="center">{title}</Typography>
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>

                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, ml:"auto"}}>
                        {pages.map(({title, path}) => (
                            <Button
                                component={Link}
                                to={path}
                                key={path}
                                sx={{ color: 'white', display: 'block'}}
                            >
                                {title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}