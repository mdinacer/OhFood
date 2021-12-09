import { useLocation, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/configureStore";

export default function PrivateRoute({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: string[];
}) {
  const { user } = useAppSelector((state) => state.account);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const userHasRequiredRole =
    user && roles?.some((r) => user.roles?.includes(r)) ? true : false;

  if (!userHasRequiredRole) {
    toast.error("You are not allowed to go there");
    return <Navigate to="/catalog" />;
  }

  return children;
}
