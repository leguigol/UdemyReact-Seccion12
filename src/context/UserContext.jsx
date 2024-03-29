import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const UserContext=createContext();

const UserProvider=({children})=>{

    const savedDataFarmacia=JSON.parse(localStorage.getItem("dataFarmacia")) || [];

    const [dataFarmacia,setDataFarmacia]=useState(savedDataFarmacia);
    const [user,setUser]=useState(false);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const unsuscribe=onAuthStateChanged(auth,(user)=>{
            //console.log(user);
            setUser(user);
        })
        return unsuscribe;
    },[]);

    useEffect(()=>{
        localStorage.setItem("dataFarmacia",JSON.stringify(dataFarmacia));
    },[dataFarmacia]);

    if(user===false) return <p>Loading app....</p>
    
    return (
        <UserContext.Provider value={{user,setUser,loading,setLoading,dataFarmacia,setDataFarmacia}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export const useUserContext=()=> useContext(UserContext)