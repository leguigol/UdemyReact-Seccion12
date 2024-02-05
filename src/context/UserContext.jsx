import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const UserContext=createContext();

const UserProvider=({children})=>{

    const [user,setUser]=useState(false);
    const [loading,setLoading]=useState(false);
    const [cuit,setCuit]=useState(false);
    const [razon,setRazon]=useState(false);

    useEffect(()=>{
        const unsuscribe=onAuthStateChanged(auth,(user)=>{
            //console.log(user);
            setUser(user);
        })
        return unsuscribe;
    },[]);

    if(user===false) return <p>Loading app....</p>
    
    return (
        <UserContext.Provider value={{user,setUser,loading,setLoading,cuit,setCuit,razon,setRazon}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export const useUserContext=()=> useContext(UserContext)