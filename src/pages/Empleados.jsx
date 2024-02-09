import {useFirestore} from '../hooks/useFirestore';
import { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import Checkbox from '@mui/material/Checkbox';
import { useUserContext } from '../context/UserContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

// function createData(id, cuil, apellido, nombres, categoria,feingreso,feegreso) {
//     return { id,cuil, apellido, nombres, categoria,feingreso,feegreso };
//   }

const Empleados = () => {

  const {loading}=useUserContext()
    const {getDataEmpleados,dataEmp}=useFirestore();

    const categorias = [
      'Cadete',
      'Aprendiz/Ayudante',
      'Personal auxiliar ',
      'Personal con asignacion',
      'Ayudante en gestion',
      'Personal en gestion',
      'Farmaceutico'
    ];

    useEffect(()=>{
        getDataEmpleados();
        console.log('dataemp:',dataEmp);
    },[]);

    if(loading.getDataE) return <p>Loading data....</p>
    
          return (
            <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Cuil</TableCell>
                    <TableCell align="center">Apellido</TableCell>
                    <TableCell align="center">Nombres</TableCell>
                    <TableCell align="center">Categoria</TableCell>
                    <TableCell align="center">Fecha Ingreso</TableCell>
                    <TableCell align="center">Fecha Egreso</TableCell>
                    <TableCell align="center">Licencia</TableCell>
                    <TableCell align="center">Reducida</TableCell>
                    <TableCell align="center">Sindical</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataEmp.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.uid}
                      </TableCell>
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.cuil}</TableCell>
                      <TableCell align="center">{row.apellido}</TableCell>
                      <TableCell align="center">{row.nombres}</TableCell>
                      <TableCell align="center">{categorias[row.categoria]}</TableCell>
                      <TableCell align="center">{row.fecha_ingreso===null ? '': moment(row.fecha_ingreso).format('DD/MM/YY')}</TableCell>
                      <TableCell align="center">{row.fecha_egreso===null ? '': moment(row.fecha_egreso).format('DD/MM/YY')}</TableCell>
                      <TableCell align="center">{row.licencia ? <Checkbox checked /> : null}</TableCell>
                      <TableCell align="center">{row.reducida ? <Checkbox checked /> : null}</TableCell>
                      <TableCell align="center">{row.sindical ? <Checkbox checked /> : null}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button 
              component={Link}
              sx={{padding: 1, margin: 2}}
              variant='contained'
              to="/alta-empleado"
            >ALTA DE EMPLEADO</Button>  
            
            </>
          );
        
    

}
export default Empleados;