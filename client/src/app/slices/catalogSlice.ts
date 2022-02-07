import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import {MetaData} from "../models/pagination";
import {Product, ProductParams} from "../models/product";
import {RootState} from "../store/configureStore";
import {Category} from "../models/category";

interface CatalogState {
    productsLoaded: boolean;
    categoriesLoaded: boolean;
    status: string;
    categories: Category[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

export function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append("pageNumber", productParams.pageNumber.toString());
    params.append("pageSize", productParams.pageSize.toString());
    params.append("orderBy", productParams.orderBy);
    if (productParams.searchTerm) {
        params.append("searchTerm", productParams.searchTerm);
    }

    if (productParams.category && productParams.category > 0) {
        params.append("category", productParams.category.toString());
    } else {
        params.delete("category");
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
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    "catalog/fetchProductAsync",
    async (productId: number, thunkApi) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCategoriesAsync = createAsyncThunk(
    "catalog/fetchCategoriesAsync",
    async (_, thunkApi) => {
        try {
            return await agent.Catalog.fetchCategories();
        } catch (error: any) {
            return thunkApi.rejectWithValue({error: error.data})
        }
    }
)


function initParams() {
    return {
        pageNumber: 1,
        pageSize: 8,
        orderBy: "name",
        ingredients: [],
        categories: []
    }
}

export const catalogSlice = createSlice({
    name: "catalog",
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        categoriesLoaded: false,
        status: "idle",
        categories: [],
        productParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },

        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },

        setPageSize: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },

        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },

        resetProductParams: (state) => {
            state.productParams = initParams();
        },

        setProduct: (state, action) => {
            state.productsLoaded = false;
        },
        updateProduct: productsAdapter.updateOne,
        removeProduct: productsAdapter.removeOne,
        updateCategories: (state) => {
            state.categoriesLoaded = false;
        },
    },
    extraReducers: (builder => {

        builder.addCase(fetchProductsAsync.pending, (state) => {
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

        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = "pendingFetchProduct";
        });

        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload)
            state.status = "idle";
        });

        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = "idle";
        });

        builder.addCase(fetchCategoriesAsync.pending, (state) => {
            state.status = "pendingFetchTypes";
        });

        builder.addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.categoriesLoaded = true;
            state.status = "idle";
        });


        builder.addCase(fetchCategoriesAsync.rejected, (state) => {
            state.status = "idle";
        });
    })
})

export const productSelectors = productsAdapter
    .getSelectors((state: RootState) => state.catalog);

export const {
    setProductParams,
    resetProductParams,
    setMetaData,
    setPageNumber,
    setPageSize,
    setProduct,
    updateProduct,
    removeProduct,
    updateCategories
} = catalogSlice.actions;