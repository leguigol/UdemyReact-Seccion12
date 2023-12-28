import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useEffect } from "react";

const LayoutPrivate = () => {
    
    const {user}=useUserContext();
    const navigate=useNavigate();

    useEffect(()=>{
        console.log(user);
        if(!user){
            navigate('/')
        }
    },[user])

    return (
        <>
            <Outlet />
        </>
    )
}

export default LayoutPrivate;
