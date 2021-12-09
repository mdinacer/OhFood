import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/pagination";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;

}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", productParams.pageNumber.toString());
    params.append("pageSize", productParams.pageSize.toString());
    params.append("orderBy", productParams.orderBy);
    if (productParams.searchTerm) {
        params.append("searchTerm", productParams.searchTerm);
    }

    if (productParams.brands && productParams.brands.length > 0) {
        params.append("brands", productParams.brands.toString());
    } else {
        params.delete("brands");
    }

    if (productParams.types && productParams.types.length > 0) {
        params.append("types", productParams.types.toString());
    } else {
        params.delete("types");
    }

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    "catalog/fetchProductsAsync",
    async (_, thunkApi) => {
        const productParams = thunkApi.getState().catalog.productParams;
        const params = getAxiosParams(productParams);
        try {
            const response = await agent.Catalog.list(params);
            thunkApi.dispatch(setMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    "catalog/fetchProductAsync",
    async (productId: number, thunkApi) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchFilters = createAsyncThunk(
    "catalog/fetchFilters",
    async (_, thunkApi) => {
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
)

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 50,
        orderBy: "name",
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        filtersLoaded: false,
        status: "idle",
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload, pageNumber: 1 };
        },

        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = { ...state.productParams, ...action.payload };
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },

        resetProductParams: (state) => {
            state.productParams = initParams();
        },

        setProduct: (state, action) => {
            //productsAdapter.upsertOne(state, action.payload);
            state.productsLoaded = false;
        },

        removeProduct: (state, action) => {
            //productsAdapter.removeOne(state, action.payload);
            state.productsLoaded = false;
        },
    },
    extraReducers: (builder => {

        //#region Fetch Products
        builder.addCase(fetchProductsAsync.pending, (state, action) => {
            state.status = "pendingFetchProducts";
        });

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload)
            state.status = "idle";
            state.productsLoaded = true;
        });

        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = "idle";
        });

        //#endregion Fetch Products

        //#region fetch product
        builder.addCase(fetchProductAsync.pending, (state, action) => {
            state.status = "pendingFetchProduct";
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });

        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = "idle";
        });

        //#endregion

        //#region fetch filters
        builder.addCase(fetchFilters.pending, (state, action) => {
            state.status = "pendingFetchFilters";
        });

        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = "idle";
        });

        builder.addCase(fetchFilters.rejected, (state) => {
            state.status = "idle";
        });

        //#endregion
    })
})

export const productSelectors = productsAdapter
    .getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams, setMetaData, setPageNumber, setProduct, removeProduct } = catalogSlice.actions;