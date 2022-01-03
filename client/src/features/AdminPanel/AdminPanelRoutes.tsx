import {Route,Routes} from "react-router-dom";
import PrivateRoute from "../../app/layout/PrivateRoute";
import {lazy, Suspense} from "react";

const AdminPanelPage = lazy(() => import("./AdminPanelPage"));
const DashboardPage = lazy(() => import("./dashboard/DashboardPage"));

export default function AdminPanelRoutes(){
    return(
       <Routes>
           <Route path="/admin" element={
               <PrivateRoute roles={["Admin"]}>
                   <Suspense fallback={<div/>}>
                       <AdminPanelPage/>
                   </Suspense>
               </PrivateRoute>
           }>
               <Route path="orders" element={
                   <Suspense fallback={<div/>}>
                       <div>orders</div>
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
       </Routes>
    )
}