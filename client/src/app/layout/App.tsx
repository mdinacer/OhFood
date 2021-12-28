import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";

import LoadingComponent from "./LoadingComponent";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../../features/home/HomePage";
import {fetchCurrentUser} from "../slices/accountSlice";
import {fetchBasketAsync} from "../slices/basketSlice";
import {useAppDispatch} from "../store/configureStore";
import "./App.scss";
import Header from "./header/Header";

//const Header = lazy(() => import("./header/Header"));
const CheckoutPage = lazy(() => import("../../features/checkout/CheckoutPage"));
const ProductDetails = lazy(() => import("../../features/menu/ProductDetails"));
const MenuPage = lazy(() => import("../../features/menu/MenuPage"));
const Login = lazy(() => import("../../features/account/Login"));
const Register = lazy(() => import("../../features/account/Register"));
const Gallery = lazy(() => import("../../features/gallery/Gallery"));

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#FC9918",
        },
    },
});

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#FC9918",
        },
    },
});


// export const hubConnection = new signalR.HubConnectionBuilder()
//     .withUrl("http://localhost:5000/hubs/main")
//     .configureLogging(signalR.LogLevel.Information)
//     .build();


function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = useCallback(async () => {
        try {
            //await hubConnection.start();
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    // function getLocation() {
    //     if (navigator.geolocation) {
    //         console.log("getting location");
    //
    //         navigator.permissions.query({name: "geolocation"}).then((result) => {
    //             console.log(result);
    //             if (result.state === "granted") {
    //                 console.log(result.state);
    //                 navigator.geolocation.getCurrentPosition(function (position) {
    //                     console.log("Latitude is :", position.coords.latitude);
    //                     console.log("Longitude is :", position.coords.longitude);
    //                 });
    //
    //                 //If granted then you can directly call your function here
    //             } else if (result.state === "prompt") {
    //                 console.log(result.state);
    //             } else if (result.state === "denied") {
    //                 console.log(result.state);
    //             }
    //             result.onchange = function () {
    //                 console.log(result.state);
    //             };
    //         });
    //     } else {
    //         alert("Sorry Not available!");
    //     }
    // }

    useEffect(() => {
        initApp().then(() => setLoading(false));
        //getLocation();
    }, [initApp]);

    if (loading) return <LoadingComponent message="Initializing"/>;

    return (
        <ThemeProvider theme={DarkTheme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
            <CssBaseline/>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
            <Suspense fallback={<div>Loading</div>}>
                <Routes>
                    <Route path="/menu" element={<MenuPage/>}/>
                    <Route path="/menu/:id" element={<ProductDetails/>}/>
                    <Route path="/checkout" element={<PrivateRoute roles={["Member",]}><CheckoutPage/></PrivateRoute>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                </Routes>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
