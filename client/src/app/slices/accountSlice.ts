import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {FieldValues} from "react-hook-form";
import agent from "../../app/api/agent";
import {User} from "../models/user";
import {history} from "../..";
import {toast} from "react-toastify";
import {setBasket} from "./basketSlice";
import {Profile} from "../models/profile";

interface AccountState {
    user: User | null,
    profile: Profile | null;

}

const initialState: AccountState = {
    user: null,
    profile: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    "account/signInUser",
    async (data, thunkApi) => {
        try {
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;
            if (basket) thunkApi.dispatch(setBasket(basket));
            localStorage.setItem("user", JSON.stringify(user))
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    "account/fetchCurrentUser",
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
        try {
            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto;
            if (basket) thunkApi.dispatch(setBasket(basket));
            localStorage.setItem("user", JSON.stringify(user))
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            history.push('/');
        },
        setUser: (state, action) => {
            const data = action.payload.token.split('.')[1];
            if (data) {
                let claims = JSON.parse(atob(data));
                let roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                state.user = {...action.payload, "roles": typeof (roles) === "string" ? [roles] : roles};
            } else {
                state.user = action.payload;
            }
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            history.push('/login');
        });

        builder.addCase(signInUser.rejected, (state, action) => {
            throw action.payload;
        })

        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            const data = action.payload.token.split('.')[1];
            if (data) {
                let claims = JSON.parse(atob(data));
                let roles = claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                state.user = {...action.payload, "roles": typeof (roles) === "string" ? [roles] : roles};
                state.profile = state.user.profile;

                // if (hubConnection.state === signalR.HubConnectionState.Connected) {
                //     hubConnection.invoke('JoinRoom', "Admin")
                //         .catch((err: Error) => {
                //         return console.error(err.toString());
                //     });
                // }
            } else {
                state.user = action.payload;
            }

        });

    })
})

export const {setUser, signOut} = accountSlice.actions;

