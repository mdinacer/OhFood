import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {accountSlice} from "../slices/accountSlice";
import {basketSlice} from "../slices/basketSlice";
import {catalogSlice} from "../slices/catalogSlice";
import {announcesSlice} from "../slices/announceSlice";
import {orderSlice} from "../slices/orderSlice";


export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        announce: announcesSlice.reducer,
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        order: orderSlice.reducer,
    },
    //middleware: new MiddlewareArray().concat(sampleMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;