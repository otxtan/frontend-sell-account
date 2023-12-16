import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from './userProvider';
const PrivateRoutes = () => {
    const { user, login, logout } = useUser();
    // const accessToken = window.localStorage.getItem("accessToken");
    // if (accessToken){

    //     const payloadBase64 = accessToken.split(".")[1];
    //     const payload = atob(payloadBase64);
    //     login(JSON.parse(payload));
    // }
    
    // const isAuth = false;
    // user?isAuth=true:isAuth=false;
    
    return user ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
