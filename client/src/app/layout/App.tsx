import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../../features/home/HomePage";
import { fetchCurrentUser } from "../slices/accountSlice";
import { fetchBasketAsync } from "../slices/basketSlice";
import { useAppDispatch } from "../store/configureStore";
import LoadingComponent from "./LoadingComponent";
import Header from "./header/Header";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.scss";
import agent from "../api/agent";

const CheckoutPage = lazy(() => import("../../features/checkout/CheckoutPage"));
const ProductDetails = lazy(() => import("../../features/menu/ProductDetails"));
const MenuPage = lazy(() => import("../../features/menu/MenuPage"));
const Login = lazy(() => import("../../features/account/Login"));
const Register = lazy(() => import("../../features/account/Register"));
const Gallery = lazy(() => import("../../features/gallery/Gallery"));
const ContactPage = lazy(() => import("../../features/contact/ContactPage"));
const AdminPanelPage = lazy(
  () => import("../../features/AdminPanel/AdminPanelPage")
);
const DashboardPage = lazy(
  () => import("../../features/AdminPanel/dashboard/DashboardPage")
);
const AdminOrdersPage = lazy(
  () => import("../../features/AdminPanel/orders/AdminOrdersPage")
);
const ProfilePage = lazy(() => import("../../features/profile/ProfilePage"));
const AddressBook = lazy(() => import("../../features/profile/AddressBook"));
const ProfileOrdersPage = lazy(
  () => import("../../features/profile/ProfileOrdersPage")
);

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
      main: "#FC9918",
    },
    secondary: {
      main: "#064663",
    },
  },
});

function App() {
  // const positoin = axios.get(('https://nominatim.openstreetmap.org/reverse', {
  //   lat: position.coords.latitude,
  //   lon: position.coords.longitude,
  //   format: 'json',
  // })
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  //const [connection, setConnection] = useState<HubConnection | null>(null);

  const [location, setLocation] = useState<{ lat: number, long: number } | null>(null)
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      if (position) {
        setLocation({ lat: position.coords.latitude, long: position.coords.longitude })
      }
    });

  }, [])

  useEffect(() => {
    if (location) {
      console.log(location);
      agent.Location
        .getLocation(location.lat, location.long)
        .then(response => console.log(response.address))

    }

  }, [location])

  if (loading) return <LoadingComponent fullScreen={true} message="Initializing" />;

  return (
    <ThemeProvider theme={DarkTheme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      {!pathname.includes("/admin") && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["Admin"]}>
              <Suspense fallback={<LoadingComponent fullScreen={true} />}>
                <AdminPanelPage />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route
            path="orders"
            element={
              <Suspense fallback={<LoadingComponent fullScreen={true} />}>
                <AdminOrdersPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/customers"
            element={
              <Suspense fallback={<LoadingComponent fullScreen={true} />}>
                <div>customers</div>
              </Suspense>
            }
          />
          <Route
            path="/admin/products"
            element={
              <Suspense fallback={<LoadingComponent fullScreen={true} />}>
                <div>products</div>
              </Suspense>
            }
          />
          <Route
            path="/admin/announces"
            element={
              <Suspense fallback={<LoadingComponent fullScreen={true} />}>
                <div>announces</div>
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<LoadingComponent fullScreen={true} />}>
                <DashboardPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/menu"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <MenuPage />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <ContactPage />
            </Suspense>
          }
        />

        <Route
          path="/menu/:id"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <PrivateRoute roles={["Member"]}>
                <CheckoutPage />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route path="profile"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <PrivateRoute roles={["Member"]}>
                <ProfilePage />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="profile/addresses"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <PrivateRoute roles={["Member"]}>
                <AddressBook />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="profile/orders"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <PrivateRoute roles={["Member"]}>
                <ProfileOrdersPage />
              </PrivateRoute>
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/gallery"
          element={
            <Suspense fallback={<LoadingComponent fullScreen={true} />}>
              <Gallery />
            </Suspense>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
