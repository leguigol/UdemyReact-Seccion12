import { Button, Typography,Box} from '@mui/material'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContext';
import {useFirestore} from '../hooks/useFirestore';
import { useEffect } from 'react';

const Empleados = () => {

    const {user, setUser,cuit,razon}=useUserContext();
    const {data,error,loading,getDataEmpleados,addDataF,dataEmp}=useFirestore();

    useEffect(()=>{
        getDataEmpleados();
        console.log('dataemp:',dataEmp);
    },[]);

    if(loading.getDataE) return <p>Loading data....</p>


    return (
        <Box display="flex" flexDirection="row" gap={2}>
        {dataEmp.map((item)=>(
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <div>{item.cuil}</div>
            <div>{item.categoria}</div>
            <div>
            Ingreso: {item.fecha_ingreso?.toDate().toLocaleDateString()}
            </div>
            <div>
            Egreso: {item.fecha_egreso?.toDate().toLocaleDateString()}
            </div>
            <div>Licencia: {item.licencia}</div>
            <div>Reducida: {item.reducida}</div>
            <div>Sindical: {item.sindical}</div>
            </div>
        ))}            
        </Box>
    )

}
export default Empleados;