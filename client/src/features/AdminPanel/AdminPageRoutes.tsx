import {Route, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import PrivateRoute from "../../app/layout/PrivateRoute";


export default function AdminPageRoutes() {

    const AdminPage = lazy(() => import( "./AdminPage"));
    const AdminOrdersPage = lazy(() => import( "./AdminOrdersPage"));
    const AdminProductsPage = lazy(() => import( "./AdminProductsPage"));
    const AdminCustomersPage = lazy(() => import( "./AdminCustomersPage"));
    const AdminDashboardPage = lazy(() => import( "./AdminDashboardPage"));
    return (
        <Routes>
            <Route path={"/admin"} element={
                <Suspense fallback={<LoadingComponent fullScreen={true}/>}>
                    <PrivateRoute roles={["Admin"]}>
                        <AdminPage/>
                    </PrivateRoute>
                </Suspense>
            }>
                <Route path={"dashboard"} element={
                    <Suspense fallback={<div/>}>
                        <AdminDashboardPage/>
                    </Suspense>
                }/>
                <Route path={"orders"} element={
                    <Suspense fallback={<div/>}>
                        <AdminOrdersPage/>
                    </Suspense>
                }/>

                <Route path={"customers"} element={
                    <Suspense fallback={<div/>}>
                        <AdminCustomersPage/>
                    </Suspense>
                }/>

                <Route path={"products"} element={
                    <Suspense fallback={<div/>}>
                        <AdminProductsPage/>
                    </Suspense>
                }/>

            </Route>
        </Routes>
    )
}