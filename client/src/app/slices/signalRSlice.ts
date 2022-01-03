import * as signalR from "@microsoft/signalr";
import {HubConnection, HubConnectionState} from "@microsoft/signalr";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface SignalRState {
    connection: HubConnection | null;
    state: HubConnectionState;
}


const initialState: SignalRState = {
    connection: null,
    state: HubConnectionState.Disconnected
}


export const startConnectionAsync = createAsyncThunk<HubConnectionState, HubConnection>(
    "signalR/startConnection",
    async (connection, thunkApi) => {
        try {
            await connection.start();
            return connection.state;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
);

export const stopConnectionAsync = createAsyncThunk<HubConnectionState, HubConnection>(
    "signalR/startConnection",
    async (connection, thunkApi) => {
        try {
            await connection.stop();
            return connection.state;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
);


export const signalRSlice = createSlice({
    name: "signalR",
    initialState,
    reducers: {
        createConnection: (state, action) => {
            state.connection = new signalR.HubConnectionBuilder()
                .withUrl(action.payload.baseUrl, {accessTokenFactory: () => action.payload.token})
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Debug)
                .build();
        },
        setConnection: (state) => {

        }
    }
})

