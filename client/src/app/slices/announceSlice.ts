import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Announce} from "../models/announce";
import {RootState} from "../store/configureStore";
import agent from "../api/agent";

interface AnnounceState {
    announcesLoaded: boolean;
    announces: Announce[];
    status: string;
}

const initialState: AnnounceState = {
    announces: [],
    announcesLoaded: false,
    status: "idle"
}

export const fetchAnnouncesAsync = createAsyncThunk<Announce[], void, { state: RootState }>(
    "home/fetchAnnouncesAsync",
    async (_, thunkAPI) => {
        try {
            return  await agent.Announces.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const announcesSlice = createSlice({
    name: "announces",
    initialState,
    reducers: {
        setAnnounces: (state, action) => {
            state.announces = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchAnnouncesAsync.pending, (state, action) => {
            state.status = "pendingFetchAnnounces";
        });

        builder.addCase(fetchAnnouncesAsync.fulfilled, (state, action) => {
            state.announces = action.payload
            state.status = "idle";
            state.announcesLoaded = true;
        });
    })
})

