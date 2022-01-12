import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline, responsiveFontSizes} from "@mui/material";
import {Route, Routes, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../../features/home/HomePage";
import {fetchCurrentUser} from "../slices/accountSlice";
import {fetchBasketAsync} from "../slices/basketSlice";
import {useAppDispatch} from "../store/configureStore";
import LoadingComponent from "./LoadingComponent";
import Header from "./header/Header";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.scss";


const ServerError = lazy(() => import("../errors/ServerError"));
const CheckoutPage = lazy(() => import("../../features/checkout/CheckoutPage"));
const ProductDetails = lazy(() => import("../../features/menu/ProductDetails"));
const MenuPage = lazy(() => import("../../features/menu/MenuPage"));
const Login = lazy(() => import("../../features/account/Login"));
const Register = lazy(() => import("../../features/account/Register"));
const Gallery = lazy(() => import("../../features/gallery/Gallery"));
const ContactPage = lazy(() => import("../../features/contact/ContactPage"));
const ProfilePage = lazy(() => import("../../features/profile/ProfilePage"));
const AddressBook = lazy(() => import("../../features/profile/AddressBook"));
const ProfileOrdersPage = lazy(() => import("../../features/profile/ProfileOrdersPage"));
const ProfileSettings = lazy(() => import("../../features/profile/ProfileSettings"));

export const DarkTheme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#FC9918",
                //main: "#FC9918",
            },
        },
    })
);

export const LightTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#FC9918",
        },
        secondary: {
            main: "#064663",
        },
    },
}));

function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const {pathname} = useLocation();
    //const [connection, setConnection] = useState<HubConnection | null>(null);
    const initApp = useCallback(async () => {
        try {
            await dispatch(fetchCurrentUser());
            await dispatch(fetchBasketAsync());
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        initApp().then(() => setLoading(false));
    }, [initApp]);

    // useEffect(() => {
    //   navigator.geolocation.getCurrentPosition(function (position) {
    //     if (position) {
    //       setLocation({ lat: position.coords.latitude, long: position.coords.longitude })
    //     }
    //   });
    //
    // }, [])
    //
    // useEffect(() => {
    //   if (location) {
    //     console.log(location);
    //     agent.Location
    //       .getLocation(location.lat, location.long)
    //       .then(response => console.log(response.address))
    //
    //   }
    //
    // }, [location])

    if (loading) return <LoadingComponent fullScreen={true} message="Initializing"/>;

    return (
        <ThemeProvider theme={DarkTheme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
            <CssBaseline/>
            {!pathname.includes("/admin") && <Header/>}
            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route
                    path="/menu"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <MenuPage/>
                        </Suspense>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <ContactPage/>
                        </Suspense>
                    }
                />

                <Route
                    path="/menu/:id"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <ProductDetails/>
                        </Suspense>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <PrivateRoute roles={["Member"]}>
                                <CheckoutPage/>
                            </PrivateRoute>
                        </Suspense>
                    }
                />

                <Route path="profile"
                       element={
                           <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                               <PrivateRoute roles={["Member"]}>
                                   <ProfilePage/>
                               </PrivateRoute>
                           </Suspense>
                       }
                />

                <Route
                    path="profile/addresses"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <PrivateRoute roles={["Member"]}>
                                <AddressBook/>
                            </PrivateRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="profile/orders"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <PrivateRoute roles={["Member"]}>
                                <ProfileOrdersPage/>
                            </PrivateRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="profile/settings"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <PrivateRoute roles={["Member"]}>
                                <ProfileSettings/>
                            </PrivateRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<div/>}>
                            <Login/>
                        </Suspense>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Suspense fallback={<div/>}>
                            <Register/>
                        </Suspense>
                    }
                />
                <Route
                    path="/gallery"
                    element={
                        <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                            <Gallery/>
                        </Suspense>
                    }
                />

                <Route
                    path="/server-error"
                    element={
                        <Suspense fallback={<div/>}>
                            <ServerError/>
                        </Suspense>
                    }
                />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
