import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {fetchProductsAsync, fetchTypesAsync, productSelectors,} from "../slices/catalogSlice";

export default function useProducts() {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        typesLoaded,
        types,
        metaData,
    } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!productsLoaded) {
            dispatch(fetchProductsAsync());
        }
    }, [dispatch, productsLoaded]);

    useEffect(() => {
        if (!typesLoaded) {
            dispatch(fetchTypesAsync());
        }
    }, [dispatch, typesLoaded]);


    return {
        products,
        productsLoaded,
        typesLoaded,
        types,
        metaData,
    };
}
