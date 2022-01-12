import {Alert, Box, Button, Collapse, Container, Grid, IconButton, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import agent from "../../app/api/agent";
import {ShippingAddress} from "../../app/models/shippingAddress";
import {LocationAddress, LocationData} from "../../app/models/locationAddress";
import {AddLocationAltOutlined, MapOutlined} from "@mui/icons-material";
import AppTextInput from "../../app/components/AppTextInput";
import {LoadingButton} from "@mui/lab";
import {yupResolver} from "@hookform/resolvers/yup";
import {addressValidationSchema} from "./profileValidation";

interface Props {
    address?: ShippingAddress | null;
    onCancel: (value: boolean) => void;
    onSubmit: (data: any) => void;
}

export default function AddressForm({address, onCancel, onSubmit}: Props) {
    const [locationAddress, setLocationAddress] = useState<LocationAddress | null>(null);
    const [browserLocation, setBrowserLocation] = useState<{ lon: string, lat: string } | null>(null)
    const [busy, setBusy] = useState(false)
    const [fullAddress, setFullAddress] = useState<string | null>(null)
    const [state, setState] = useState<{
        message: string, severity: "warning" | "info" | "error" | "success"
    } | null>(null)
    const {control, reset, handleSubmit, setValue, formState: {isSubmitting}} = useForm({
        mode: 'all',
        resolver: yupResolver<any>(addressValidationSchema)
    });

    useEffect(() => {
        navigator.permissions.query({name: 'geolocation'}).then((result) => {
            switch (result.state) {
                case "prompt":
                    setState({
                        message: "A popup message will ask you to allow geolocation in your browser, " +
                            "click allow to add your actual position",
                        severity: "warning",
                    });
                    break;
                case "denied":
                    setState({
                        message: "Geolocation is disabled, you need to enable it to add an address.",
                        severity: "error"
                    });
                    break;
                case "granted":
                    setState(null);
                    break;
            }
        })

        return () => {
            setState(null);
        }
    }, [setState])

    useEffect(() => {
        if (address) {
            reset(address)
            const {id, title, fullName, address1, isDefault, ...rest} = address
            setLocationAddress({...rest})
            setBrowserLocation({lon: address.longitude, lat: address.latitude})
        }
    }, [address, reset])

    const getBrowserLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
                setBrowserLocation({
                    lon: position.coords.longitude.toString(),
                    lat: position.coords.latitude.toString()
                })
                getClientLocation(position.coords.longitude, position.coords.latitude)
            } else {
                setBrowserLocation(null);
            }
        })
    }

    const getClientLocation = (lon: number, lat: number) => {
        setBusy(true);
        agent.Location.getLocation(lat, lon)
            .then((response: LocationData) => {
                setFullAddress(response.display_name)
                const data = {...response.address, longitude: response.lon, latitude: response.lat}
                setLocationAddress(data)
                setValue("county", data.county);
                setValue("town", data.town ?? data.suburb);
                setValue("neighbourhood", data.neighbourhood);
                setState({
                    message: "If the position is not correct, try again until you get the correct result.",
                    severity: "info"
                })
            })
            .catch(error => console.log(error))
            .finally(() => setBusy(false))
    }


    async function handleSubmitData(data: FieldValues) {
        try {
            const item = {
                id: address?.id ?? 0,
                ...locationAddress,
                ...data,
                isDefault: address?.isDefault ?? false,
            }
            if (address) {
                await agent.Profile.updateAddress({...item});
            } else {
                await agent.Profile.createAddress(item);
            }
            onSubmit(item);
            reset();
        } catch (error) {
            console.log(error);
        } finally {
            onCancel(false);
        }
    }

    const handleCancel = () => {
        reset();
        onCancel(false);
    }

    return (
        <Container>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"h6"}>Address</Typography>
                <IconButton color={"primary"} disabled={busy} onClick={() => getBrowserLocation()}>
                    <AddLocationAltOutlined/>
                </IconButton>
            </Stack>
            {state && (
                <Alert severity={state.severity}>{state.message}</Alert>
            )}

            <Collapse in={locationAddress !== null}>
                {locationAddress && (
                    <Box>
                        <Grid container spacing={2} sx={{my: 1}}>
                            <Grid item xs={6} md={6}>
                                <Stack>
                                    <Typography variant={"caption"}>Country</Typography>
                                    <Typography variant={"subtitle1"}>{locationAddress.country}</Typography>
                                </Stack>
                            </Grid>


                            <Grid item xs={12} md={6}>
                                <Stack sx={{
                                    flexDirection: {xs: "row", md: "column"},
                                    justifyContent: "space-between",
                                    alignItems: {xs: "center", md: "flex-start"}
                                }}>
                                    <Typography variant={"caption"}>Zip Code</Typography>
                                    <Typography
                                        variant={"subtitle1"}>{locationAddress.postcode}</Typography>
                                </Stack>
                            </Grid>

                            {fullAddress && (
                                <Grid item xs={12} md={12}>
                                    <Stack>
                                        <Typography variant={"caption"}>Full Address</Typography>
                                        <Typography variant={"body2"}>{fullAddress}</Typography>
                                    </Stack>
                                </Grid>
                            )}

                            {browserLocation && (
                                <>
                                    <Grid item xs={12} md={6}>
                                        <Stack sx={{
                                            flexDirection: {xs: "row", md: "column"},
                                            justifyContent: "space-between",
                                            alignItems: {xs: "center", md: "flex-start"}
                                        }}>
                                            <Typography variant={"caption"}>Latitude</Typography>
                                            <Typography variant={"body2"}>{browserLocation.lat}</Typography>
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Stack sx={{
                                            flexDirection: {xs: "row", md: "column"},
                                            justifyContent: "space-between",
                                            alignItems: {xs: "center", md: "flex-start"}
                                        }}>
                                            <Typography variant={"caption"}>Longitude</Typography>
                                            <Typography variant={"body2"}>{browserLocation?.lon}</Typography>
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12} md={12} sx={{mb: 2}}>
                                        <Stack>
                                            <Button variant={"outlined"} size={"small"} color={"inherit"}
                                                    startIcon={<MapOutlined/>}
                                                    href={`https://maps.google.com/?q=${browserLocation.lat},${browserLocation.lon}`}
                                                    target={"_blank"}>Check on Maps</Button>
                                        </Stack>
                                    </Grid>
                                </>
                            )}


                        </Grid>
                    </Box>
                )}
            </Collapse>

            <Collapse in={locationAddress !== null || address != null}>
                {(locationAddress || address) && (
                    <Box component={"form"} onSubmit={handleSubmit(handleSubmitData)} sx={{color: "black"}}>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <AppTextInput control={control} name='title' label='Title'/>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <AppTextInput control={control} name='fullName' label='Full Name'/>
                            </Grid>


                            {/*<Grid item md={6} xs={12}>*/}
                            {/*    <AppTextInput control={control} name='county' label='County'/>*/}
                            {/*</Grid>*/}

                            {/*<Grid item md={6} xs={12}>*/}
                            {/*    <AppTextInput control={control} name='town' label='Town/Suburb'/>*/}
                            {/*</Grid>*/}

                            {/*<Grid item md={12} xs={12}>*/}
                            {/*    <AppTextInput control={control} name='neighbourhood' label='Street'/>*/}
                            {/*</Grid>*/}

                            <Grid item md={12} xs={12}>
                                <AppTextInput control={control} name='address1' label='Full Address'/>
                            </Grid>


                            <Grid item md={12} xs={12}>
                                <Stack direction={"row"} justifyContent='space-around' sx={{mt: 3}}>
                                    <Button variant='outlined' color='inherit'
                                            onClick={handleCancel}>Cancel</Button>
                                    <LoadingButton loading={isSubmitting} type='submit' variant='contained'
                                                   disableElevation>Submit</LoadingButton>
                                </Stack>
                            </Grid>

                        </Grid>
                    </Box>
                )}
            </Collapse>


        </Container>
    )
}