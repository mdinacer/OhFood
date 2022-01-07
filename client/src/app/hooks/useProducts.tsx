import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {fetchProductsAsync, fetchCategoriesAsync, productSelectors,} from "../slices/catalogSlice";

export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        categoriesLoaded,
        categories,
        metaData,
    } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!productsLoaded) {
            dispatch(fetchProductsAsync());
        }
    }, [dispatch, productsLoaded]);

    useEffect(() => {
        if (!categoriesLoaded) {
            dispatch(fetchCategoriesAsync());
        }
    }, [dispatch, categoriesLoaded]);


    return {
        products,
        productsLoaded,
        categoriesLoaded,
        categories,
        metaData,
    };
}
