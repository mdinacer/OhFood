import {Box, Button} from "@mui/material";
import useSignalR from "../../../app/hooks/useSignalR";
import {HubConnectionState} from "@microsoft/signalr";
import {useEffect} from "react";
import {useAppSelector} from "../../../app/store/configureStore";

export default function DashboardPage(){
    // const {connection, setUpConnection} = useSignalR();
    // const{user} = useAppSelector(state => state.account);
    //
    //
    //
    //
    // useEffect(() => {
    //     if(!connection && user){
    //         setUpConnection(user.token);
    //     }
    // },[connection, setUpConnection, user])
    //
    //
    // useEffect(() => {
    //     if(connection && connection.state === HubConnectionState.Disconnected){
    //         connection.on("NotifyAdmin", (message) => console.log(message));
    //         connection.start().then(response => {
    //             console.log("Connected: ", response);
    //         }).catch(error => console.log(error))
    //     }
    //         return () => {
    //         connection?.stop().then(() => console.log("connection Stoped"))
    //         }
    // }
    // ,[connection])
    //
    //
    //
    // async function sendNotification(){
    //     if(connection && connection.state === HubConnectionState.Connected ){
    //        await connection.invoke("NotifyClient", {user:"bob", message:"Memo from Admin"});
    //     }
    // }

    return(
       <Box>
           <Button >
               Send
           </Button>
       </Box>
    )
}