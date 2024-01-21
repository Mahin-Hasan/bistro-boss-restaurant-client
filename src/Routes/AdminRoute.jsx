import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

// goal of admin route user must be a user also an admin 

const AdminRoute = ({children}) => {// might give error use withour bracket
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin(); // send as array sp destructure as array
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }
    if (user && isAdmin) { //must satisfy both condition to continue
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;