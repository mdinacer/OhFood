import {useAppSelector} from "../../app/store/configureStore";
import {Box, Container, Typography} from "@mui/material";

export default function ProfileUserInfo() {
    const {user} = useAppSelector(state => state.account);

    return (
        <Box>
            {user && (
                <Container>
                    <Typography variant={"h5"} component={"h2"} gutterBottom>User Info</Typography>
                    <Typography variant={"caption"}>Username</Typography>
                    <Typography variant={"subtitle1"}>{user.username}</Typography>
                    <Typography variant={"caption"}>Email</Typography>
                    <Typography variant={"subtitle1"}>{user.email}</Typography>
                </Container>
            )}
        </Box>
    )
}