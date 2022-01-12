import {useAppSelector} from "../../app/store/configureStore";
import {Avatar, Box, Button, Container, Divider, Grid, Paper, Stack, Typography} from "@mui/material";
import {format} from "date-fns";
import {Edit} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {ShippingAddress} from "../../app/models/shippingAddress";
import agent from "../../app/api/agent";
import {Link} from "react-router-dom";

export default function ProfileUserInfo() {
    const {user, profile} = useAppSelector(state => state.account);
    const [address, setAddress] = useState<ShippingAddress | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        agent.Profile.fetchDefaultAddress()
            .then(response => {
                setAddress(response);
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    function stringAvatar(firstName: string, lastName: string) {
        return `${firstName[0]}${lastName[0]}`
    }

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const gridItem = (title: string, value: string | undefined, xs: number = 12, md: number = 6) => (
        <Grid item xs={xs} md={md}>
            <Grid container>
                <Grid item md={4} xs={12}>
                    <Typography variant={"caption"}>{title}</Typography>
                </Grid>

                <Grid item md={8} xs={12}>
                    {value ?(
                        <Typography variant={"subtitle1"}>{value}</Typography>
                    ):(
                        <Typography variant={"caption"}>{loading ? "Loading": "Empty"}</Typography>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
    return (

        <>
            {user && profile && (
                <Box>


                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <Paper sx={{p: 3, height: "100%"}}>
                                <Box sx={{height:"100%"}} display={"flex"} flexDirection={"column"} alignItems={"center"}
                                     justifyContent={"center"}>
                                    {profile.pictureUrl ? (
                                        <Avatar sx={{width: 120, height: 120, mb: 2}}
                                                alt={`${profile.firstName} ${profile.lastName}`}
                                                src={profile.pictureUrl}/>
                                    ) : (
                                        <Avatar sx={{
                                            width: 120,
                                            height: 120,
                                            mb: 2,
                                            bgcolor: stringToColor(`${profile.firstName} ${profile.lastName}`),
                                        }}>
                                            <Typography
                                                variant="h4">{stringAvatar(profile.firstName, profile.lastName)}</Typography>
                                        </Avatar>
                                    )}
                                    <Typography sx={{textTransform: "uppercase"}} textAlign={"center"} variant="h6"
                                                fontWeight={"bold"}>{user.username}</Typography>
                                    <Typography textAlign={"center"} variant="subtitle1"
                                                gutterBottom>{user.email}</Typography>
                                    <Typography textAlign={"center"} variant="caption">Joined</Typography>
                                    <Typography textAlign={"center"}
                                                variant="subtitle2">{format(new Date(profile.creationDate), "dd/MM/yyyy")}</Typography>
                                    <Button sx={{minWidth: '110px', my:2}} component={Link} to="/profile/settings" startIcon={<Edit/>}
                                            variant="outlined" color="inherit" size="small">
                                        Edit
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Paper sx={{p: 3, height: "100%"}}>
                                <Box component={Container} height={"100%"} display={"flex"} flexDirection={"column"}
                                     alignItems={"center"} justifyContent={"center"}>
                                    <Grid container spacing={2}>

                                        {gridItem("First Name", profile.firstName)}
                                        {gridItem("Last Name", profile.lastName)}

                                        {gridItem("Mobile", profile.phone1)}
                                        {gridItem("Phone", profile.phone2)}


                                        <Grid item xs={12} md={12}>
                                            <Grid container>
                                                <Grid item md={2} xs={10}>
                                                    <Typography variant={"caption"}>Email</Typography>
                                                </Grid>

                                                <Grid item md={8} xs={12}>
                                                    {user.email ?(
                                                        <Typography variant={"subtitle1"}>{user.email}</Typography>
                                                    ):(
                                                        <Typography variant={"caption"}>Empty</Typography>
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <Divider flexItem sx={{my:1}}/>
                                            <Typography sx={{textTransform:"uppercase"}}  variant={"caption"}>Default Delivery Address</Typography>
                                        </Grid>

                                        {gridItem("Country", address?.country)}
                                        {gridItem("State", address?.state)}
                                        {gridItem("County", address?.county)}
                                        {gridItem("Town", address?.town)}
                                        {gridItem("Zip Code", address?.postcode)}
                                        {gridItem("Street", address?.neighbourhood)}

                                        <Grid item xs={12} md={12}>
                                            <Grid container>
                                                <Grid item md={2} xs={10}>
                                                    <Typography variant={"caption"}>Full address</Typography>
                                                </Grid>

                                                <Grid item md={8} xs={12}>
                                                    <Typography variant={"subtitle1"}>{address?.address1}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )
            }
        </>

    )
}