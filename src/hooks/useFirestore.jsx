import React, { useEffect, useState } from 'react'
import { db,auth } from '../config/firebase';
import { collection, getDocs, query, where,doc,setDoc } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';

export const useFirestore = () => {

    const [data,setData]=useState([]);
    const [error,setError]=useState();
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        console.log('getData');
        getDataFarmacia();
    },[])

    const getDataFarmacia=async()=>{
        // console.log('auth:',auth.currentUser.uid);
        try{
            setLoading(true);
            const dataRef=collection(db,"farmacias");
            const q=query(dataRef,where("id","==",auth.currentUser.uid));
            const querySnapshot=await getDocs(q);
            const dataDB=querySnapshot.docs.map((doc) => doc.data());
            console.log('datadb:',dataDB);
            setData(dataDB);
        }catch(error){
            console.log('error retriving farmacias',error);
            setError(error.message); 
        }finally{
            setLoading(false);
        }
    }

    const addDataF=async(formData)=>{
        try{
            setLoading(true);
            const newDoc={
                cuit: formData.cuit,
                razon: formData.razon,
                domicilio: formData.domicilio,
                localidad: formData.localidad,
                telefono: formData.telefono,
                email: formData.email,
                id: auth.currentUser.uid
            }
            // console.log(formData);
            const docRef=doc(db,"farmacias",newDoc.id);
            await setDoc(docRef,newDoc);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return {
        data,error,loading,getDataFarmacia,addDataF
    }
    
}

