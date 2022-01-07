import {useAppSelector} from "../../app/store/configureStore";
import {Box, Container, Typography} from "@mui/material";

export default function ProfileUserInfo() {
    const {user, profile} = useAppSelector(state => state.account);

    return (
        <Box>
                <Container>
                    <Typography variant={"h5"} component={"h2"} gutterBottom>User Info</Typography>

                    {user && (
                        <Box>
                            <Typography variant={"caption"}>Username</Typography>
                            <Typography variant={"subtitle1"}>{user.username}</Typography>
                            <Typography variant={"caption"}>Email</Typography>
                            <Typography variant={"subtitle1"}>{user.email}</Typography>
                        </Box>
                    )}

                    {profile && (
                        <Box>
                            <Typography variant={"caption"}>Full Name</Typography>
                            <Typography variant={"subtitle1"}>{profile.firstName} {profile.lastName}</Typography>
                            <Typography variant={"caption"}>Phone</Typography>
                            <Typography variant={"subtitle1"}>{profile.phone1} {profile.phone2}</Typography>
                        </Box>
                    )}
                </Container>
        </Box>
    )
}