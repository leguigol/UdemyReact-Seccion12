import React, { useEffect, useState } from 'react'
import { db,auth } from '../config/firebase';
import { collection, getDocs, query, where,doc,setDoc, Query, orderBy, limit, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { useUserContext } from '../context/UserContext';

export const useFirestore = () => {

    const [data,setData]=useState([]);
    const [dataEmp,setDataemp]=useState([]);
    const [error,setError]=useState();
    const [loading,setLoading]=useState({});
    const {dataFarmacia,setDataFarmacia}=useUserContext();

    useEffect(()=>{
        getDataFarmacia();
    },[])

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
        console.log(formData.fechaingreso.toISOString());
        try{
            setLoading(prev=>({...prev, addDataE: true}));
            
            const categoryMappings = {
                'Cadete': 0,
                'Aprendiz/Ayudante': 1,
                'Personal auxiliar': 2,
                'Personal con asignacion': 3,
                'Ayudante en gestion': 4,
                'Personal en gestion': 5,
                'Farmaceutico': 6,
            };

            const xcategoria = categoryMappings[formData.categoria];

            if (xcategoria === undefined) {
              // Manejar caso de categoría no mapeada
              throw new Error('Categoría no válida');
            }
        

            const newDoc={
                cuit: dataFarmacia[0].cuit,
                cuil: formData.cuil,
                apellido: formData.apellido.toUpperCase(),
                nombres: formData.nombres.toUpperCase(),
                categoria: xcategoria,
                fecha_ingreso: formData.fechaingreso.toISOString(),
                fecha_egreso: null,
                licencia: formData.licencia,
                reducida: formData.reducida,
                sindical: formData.sindical,
                Timestamp: serverTimestamp(),
            }

            const q = query(collection(db, 'empleados'), orderBy('timestamp', 'desc'), limit(1));
            const querySnapshot = await getDocs(q);
        
            let lastId = 0;
        
            // Verifica si hay documentos en la colección
            if (!querySnapshot.empty) {
              const lastDocument = querySnapshot.docs[0];
              lastId = lastDocument.id;
            }
        
            // Suma uno al último ID
            const newId = lastId + 1;
            
            
            // console.log('newDoc:',newDoc);
            // console.log(xcategoria);
            const docRef = await addDoc(collection(db, 'empleados'), {
                ...newDoc,
                id: newId,
              });
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

