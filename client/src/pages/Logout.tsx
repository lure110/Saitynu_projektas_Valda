import Cookies from "js-cookie";
import { Navigate } from "react-router";

const Logout = () => {
    
    Cookies.set("access_token", "", {expires: 0});
    window.location.reload();
    localStorage.clear();
    return (
        <Navigate to="/" />
    );
}

export default Logout;