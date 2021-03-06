import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {NotificationItem} from "../models/notification";
import {RootState} from "../store/configureStore";

interface NotificationHubState {
    notificationsLoaded: boolean;
}

const notificationsAdapter = createEntityAdapter<NotificationItem>();


export const notificationSlice = createSlice({
    name: "notificationHub",
    initialState: notificationsAdapter.getInitialState<NotificationHubState>({
        notificationsLoaded: false,
    }),
    reducers: {
        addNotification: notificationsAdapter.addOne,
        removeNotification: notificationsAdapter.removeOne,
        updateNotification: notificationsAdapter.updateOne,
    }
})

export const notificationSelectors = notificationsAdapter
    .getSelectors((state: RootState) => state.notification);

export const {addNotification, removeNotification, updateNotification} = notificationSlice.actions;