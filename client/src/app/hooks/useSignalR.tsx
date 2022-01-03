import * as signalR from "@microsoft/signalr";
import {HubConnection, HubConnectionState} from "@microsoft/signalr";
import {useEffect, useState} from "react";
import {hubFunction} from "../middleware/types";
import {useAppSelector} from "../store/configureStore";


export default function useSignalR(sender: string) {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null)
    const {user} = useAppSelector(state => state.account);

    const setUpConnection = (token: string) => {
        const baseUrl = process.env.REACT_APP_HUB_URL;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(baseUrl!, {accessTokenFactory: () => token})
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Debug)
            .build();
        setConnection(connection);
    }

    const addCallBacks = (calls: hubFunction[], connection: HubConnection) => {
        calls.forEach(({methodName, newMethod}) =>
            connection.on(methodName, newMethod))
    }


    const startConnection = (connection: HubConnection, message: string) => {
        connection.start().then(_ => console.log(message))
            .catch(error => console.log(error));
    }

    const stopConnection = (connection: HubConnection, message: string) => {
        connection.stop().then(_ => console.log(message))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (user && !connection) {
            setUpConnection(user.token)
        }
    }, [connection, user])


    useEffect(() => {
        if (connection && connection.state === HubConnectionState.Disconnected) {
            startConnection(connection, "SignalR Hook Connection Started by " + sender)
        }

        return () => {
            if (connection && connection.state === HubConnectionState.Connected){
                stopConnection(connection, "SignalR Hook Connection Stopped")
            }

        }
    }, [connection, user])


    return {
        connection,
        setUpConnection,
        startConnection,
        stopConnection,
        addCallBacks
    }
}