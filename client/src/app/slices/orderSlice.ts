import {MetaData} from "../models/pagination";
import {Order, OrderParams} from "../models/order";
import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store/configureStore";
import agent from "../api/agent";

interface OrderState {
    ordersLoaded: boolean;
    status: string;
    orderParams: OrderParams;
    metaData: MetaData | null;
}

const ordersAdapter = createEntityAdapter<Order>();

function getAxiosParams(orderParams: OrderParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", orderParams.pageNumber.toString());
    params.append("pageSize", orderParams.pageSize.toString());
    params.append("orderBy", orderParams.orderBy);
    if (orderParams.searchTerm) {
        params.append("searchTerm", orderParams.searchTerm);
    }

    if (orderParams.status && orderParams.status > 0) {
        params.append("status", orderParams.status.toString());
    } else {
        params.delete("status");
    }
    return params;
}

export const fetchOrdersAsync = createAsyncThunk<Order[], void, { state: RootState }>(
    "admin/fetchOrdersAsync",
    async (_, thunkApi) => {
        const orderParams = thunkApi.getState().order.orderParams;
        const params = getAxiosParams(orderParams);
        try {
            const response = await agent.Orders.list(params);
            thunkApi.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const fetchAllOrdersAsync = createAsyncThunk<Order[], void, { state: RootState }>(
    "admin/fetchOrdersAsync",
    async (_, thunkApi) => {
        const orderParams = thunkApi.getState().order.orderParams;
        const params = getAxiosParams(orderParams);
        try {
            const response = await agent.Admin.fetchOrders(params);
            thunkApi.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const fetchOrderAsync = createAsyncThunk<Order, number>(
    "admin/fetchOrderAsync",
    async (orderId: number, thunkApi) => {
        try {
            return await agent.Orders.details(orderId);
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 10,
        orderBy: "dateAsc"
    }
}

export const orderSlice = createSlice({
    name: "orders",
    initialState: ordersAdapter.getInitialState<OrderState>({
        ordersLoaded: false,
        status: "idle",
        orderParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setOrderParams: (state, action) => {
            state.ordersLoaded = false;
            state.orderParams = {...state.orderParams, ...action.payload, pageNumber: 1};
        },

        setPageNumber: (state, action) => {
            state.ordersLoaded = false;
            state.orderParams = {...state.orderParams, ...action.payload};
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },

        resetOrderParams: (state) => {
            state.orderParams = initParams();
        },

        setOrder: (state, action) => {
            ordersAdapter.upsertOne(state, action.payload)
            state.ordersLoaded = false;
        },
        updateOrder: ordersAdapter.updateOne,

        removeOrder: (state, action) => {
            ordersAdapter.removeOne(state, action.payload)
            state.ordersLoaded = false;
        },
    },
    extraReducers: (builder => {


        builder.addCase(fetchOrdersAsync.pending, (state) => {
            state.status = "pendingFetchOrders";
        });

        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            ordersAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.ordersLoaded = true;
        });

        builder.addCase(fetchOrdersAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchOrderAsync.pending, (state) => {
            state.status = "pendingFetchOrder";
        });

        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            ordersAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });

        builder.addCase(fetchOrderAsync.rejected, (state) => {
            state.status = "idle";
        });
    })
})

export const orderSelectors = ordersAdapter
    .getSelectors((state: RootState) => state.order);

export const {
    setOrderParams,
    resetOrderParams,
    setMetaData,
    setPageNumber,
    setOrder,
    updateOrder,
    removeOrder
} = orderSlice.actions;
