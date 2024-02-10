import React, { useEffect, useState } from 'react'
import { db,auth } from '../config/firebase';
import { collection, getDocs, query, where,doc,setDoc } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';

export const useFirestore = () => {

    const [data,setData]=useState([]);
    const [cuitLocal,setCuitLocal]=useState();
    const [dataEmp,setDataemp]=useState([]);
    const [error,setError]=useState();
    const [loading,setLoading]=useState({});
    const {dataFarmacia,setDataFarmacia}=useUserContext();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    // useEffect(()=>{
    //     getDataFarmacia();
    // },[dataFarmacia])

    const getDataFarmacia=async()=>{
        // console.log('auth:',auth.currentUser.uid);
        try{
            setLoading(prev=>({...prev, getData: true}));
            const dataRef=collection(db,"farmacias");
            const q=query(dataRef,where("id","==",auth.currentUser.uid));
            const querySnapshot=await getDocs(q);
            const dataDB=querySnapshot.docs.map((doc) => doc.data());
            console.log('datadb:',dataDB);
            setDataFarmacia(dataDB);
        }catch(error){
            console.log('error retriving farmacias',error);
            setError(error.message); 
        }finally{
            setLoading(prev=>({...prev, getData: false}));
        }
    }

    
    const getDataEmpleados=async()=>{
        try{
            setLoading(prev=>({...prev, getDataE: true}));
            const dataRef=collection(db,"empleados");
            const q=query(dataRef,where("cuit","==",dataFarmacia[0].cuit));
            const querySnapshot=await getDocs(q);
            const dataDB=querySnapshot.docs.map((doc) => doc.data());
            console.log('datadbEmp:',dataDB);
            setDataemp(dataDB);
        }catch(error){
            console.log('error retriving farmacias',error);
            setError(error.message); 
        }finally{
            setLoading(prev=>({...prev, getDataE: false}));
        }
    }

    const addDataF=async(formData)=>{
        try{
            setLoading(prev=>({...prev, addDataF: true}));
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
            setLoading(prev=>({...prev, addDataF: false}));
        }
    }

    const addDataE=async(formData)=>{
        try{
            setLoading(prev=>({...prev, addDataE: true}));
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
            const docRef=doc(db,"empleados",newDoc.id);
            await setDoc(docRef,newDoc);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(prev=>({...prev, addDataE: false}));
        }
    }

    return {
        data,
        error,
        loading,
        getDataFarmacia,
        addDataF,addDataE,getDataEmpleados,dataEmp
    }
    
}

