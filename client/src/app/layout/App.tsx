import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";

import "react-toastify/dist/ReactToastify.min.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import { useCallback, useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Order";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";
import "./App.scss";
import Header from "./Header";
import ProductDetails from "../../features/catalog/ProductDetails";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

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

  if (loading) return <LoadingComponent message="Initializing" />;

  return (
    <>
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/inventory"
            element={
              <PrivateRoute roles={["Admin"]}>
                <Inventory />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <PrivateRoute roles={["Member"]}>
                <CheckoutWrapper />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          ></Route>

          <Route path="/menu/:id" element={<ProductDetails />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/server-error" element={<ServerError />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
