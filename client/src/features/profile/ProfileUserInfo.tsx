import { useAppSelector } from "../../app/store/configureStore";
import { Avatar, Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { Edit } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { ShippingAddress } from "../../app/models/shippingAddress";
import agent from "../../app/api/agent";

export default function ProfileUserInfo() {
    const { user, profile } = useAppSelector(state => state.account);
    const [address, setAddress] = useState<ShippingAddress | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        agent.Profile.fetchDefaultAddress()
            .then(response => setAddress(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    function stringAvatar(firstName: string, lastName: string) {
        return `${firstName[0]}${lastName[0]}`
    }

    const gridItem = (title: string, value: string | undefined, showDivider: boolean = true) => (
        <>
            <Grid container sx={{ my: 1 }}>
                <Grid item md={2} xs={12}>
                    <Typography variant="caption">{title}</Typography>
                </Grid>
                <Grid item md={8} xs={12}>
                    {value ? (
                        <Typography variant="subtitle1">{value ?? "Empty"}</Typography>
                    ) : (
                        <Typography sx={{ textTransform: "uppercase" }} variant="caption">Empty</Typography>
                    )}

                </Grid>

            </Grid>
            {showDivider && (
                <Divider sx={{ width: "100%", maxWidth: 400 }} />
            )}
        </>
    )
    return (

        <>
            {user && profile && (
                <Box>
                    <Grid container spacing={3}>
                        <Grid item md={4} xs={12}>
                            <Paper sx={{ p: 3, height: "100%" }}>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                                    {profile.pictureUrl ? (
                                        <Avatar sx={{ width: 120, height: 120, mb: 2 }}
                                            alt={`${profile.firstName} ${profile.lastName}`}
                                            src={profile.pictureUrl} />
                                    ) : (
                                        <Avatar sx={{ width: 120, height: 120, mb: 2 }} >
                                            <Typography variant="h4">{stringAvatar(profile.firstName, profile.lastName)}</Typography>
                                        </Avatar>
                                    )}
                                    <Typography sx={{ textTransform: "uppercase" }} textAlign={"center"} variant="h6" fontWeight={"bold"}>{user.username}</Typography>
                                    <Typography textAlign={"center"} variant="subtitle1" gutterBottom>{user.email}</Typography>
                                    <Typography textAlign={"center"} variant="caption">Joined</Typography>
                                    <Typography textAlign={"center"} variant="subtitle2">{format(new Date(profile.creationDate), "dd/MM/yyyy")}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item md={8} xs={12}>
                            <Paper sx={{ p: 3, height: "100%" }}>
                                <Box component={Container} height={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                                    <Grid container>
                                        {gridItem("Full Name", `${profile.firstName} ${profile.lastName}`)}
                                        {gridItem("Email", user.email)}
                                        {gridItem("Phone", profile.phone1)}
                                        {gridItem("Mobile", profile.phone2)}
                                        {gridItem("Address", loading ? "Loading" : address?.address1, false)}
                                    </Grid>
                                    <Button startIcon={<Edit />} size="small" variant="text" color="inherit">
                                        Edit
                                    </Button>
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