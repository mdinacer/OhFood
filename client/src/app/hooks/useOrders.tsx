import {useAppDispatch, useAppSelector} from "../store/configureStore";
import {useEffect} from "react";
import {fetchOrdersAsync, orderSelectors} from "../slices/orderSlice";



export default function useOrders() {
    const orders = useAppSelector(orderSelectors.selectAll);
    const {
        ordersLoaded,
        metaData,
    } = useAppSelector((state) => state.order);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!ordersLoaded) {
            dispatch(fetchOrdersAsync());
        }
    }, [dispatch, ordersLoaded]);


    return {
        orders,
        ordersLoaded,
        metaData,
    };
}