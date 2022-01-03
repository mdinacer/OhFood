import {lazy, Suspense, useCallback, useEffect, useState} from "react";
import {ThemeProvider} from "@emotion/react";
import {createTheme, CssBaseline} from "@mui/material";
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

const CheckoutPage = lazy(() => import("../../features/checkout/CheckoutPage"));
const ProductDetails = lazy(() => import("../../features/menu/ProductDetails"));
const MenuPage = lazy(() => import("../../features/menu/MenuPage"));
const Login = lazy(() => import("../../features/account/Login"));
const Register = lazy(() => import("../../features/account/Register"));
const Gallery = lazy(() => import("../../features/gallery/Gallery"));
const ContactPage = lazy(() => import("../../features/contact/ContactPage"));
const AdminPanelPage = lazy(() => import("../../features/AdminPanel/AdminPanelPage"));
const DashboardPage = lazy(() => import("../../features/AdminPanel/dashboard/DashboardPage"));
const AdminOrdersPage = lazy(() => import("../../features/AdminPanel/orders/AdminOrdersPage"));
const ProfilePage = lazy(() => import("../../features/profile/ProfilePage"));

export const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#FC9918",
        },
    },
});

export const LightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ECB365",
        },
        secondary: {
            main: "#064663"
        }
    },
});


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

    if (loading) return <LoadingComponent message="Initializing"/>;

    return (
        <ThemeProvider theme={DarkTheme}>
            <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
            <CssBaseline/>
            {!pathname.includes("/admin") && (
                <Header/>
            )}

            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/admin" element={
                    <PrivateRoute roles={["Admin"]}>
                        <Suspense fallback={<div/>}>
                            <AdminPanelPage/>
                        </Suspense>
                    </PrivateRoute>
                }>
                    <Route path="orders" element={
                        <Suspense fallback={<div/>}>
                            <AdminOrdersPage/>
                        </Suspense>
                    }/>
                    <Route path="/admin/customers" element={
                        <Suspense fallback={<div/>}>
                            <div>customers</div>
                        </Suspense>
                    }/>
                    <Route path="/admin/products" element={
                        <Suspense fallback={<div/>}>
                            <div>products</div>
                        </Suspense>
                    }/>
                    <Route path="/admin/announces" element={
                        <Suspense fallback={<div/>}>
                            <div>announces</div>
                        </Suspense>
                    }/>
                    <Route path="/admin/dashboard" element={
                        <Suspense fallback={<div/>}>
                            <DashboardPage/>
                        </Suspense>
                    }/>
                </Route>
                <Route
                    path="/menu"
                    element={
                        <Suspense fallback={<div/>}>
                            <MenuPage/>
                        </Suspense>
                    }
                />
                <Route
                    path="/contact"
                    element={
                        <Suspense fallback={<div/>}>
                            <ContactPage/>
                        </Suspense>
                    }
                />

                <Route
                    path="/menu/:id"
                    element={
                        <Suspense fallback={<div/>}>
                            <ProductDetails/>
                        </Suspense>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Suspense fallback={<div/>}>
                            <PrivateRoute roles={["Member"]}>
                                <CheckoutPage/>
                            </PrivateRoute>
                        </Suspense>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <Suspense fallback={<div/>}>
                            <PrivateRoute roles={["Member"]}>
                                <ProfilePage/>
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
                        <Suspense fallback={<div/>}>
                            <Gallery/>
                        </Suspense>
                    }
                />

            </Routes>
        </ThemeProvider>
    );
}

export default App;
