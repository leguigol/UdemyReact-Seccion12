import { Avatar, Box, Typography,TextField, Select, MenuItem, FormControl, InputLabel, Stack, FormControlLabel, FormGroup, Checkbox} from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import * as Yup from "yup";
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb';
import { useNavigate } from 'react-router-dom';
import {useFirestore} from '../hooks/useFirestore';

const Aempleado = () => {

    const navigate=useNavigate();
    const {addDataE}=useFirestore();

    const onSubmit=async(values,{setSubmitting, setErrors})=>{
        console.log('submit')
        try{
            console.log(values);
            await addDataE(values);
            navigate('/empleados');
        }catch(error){
          console.log(error);
        }finally{
          setSubmitting(false);
        }    
      }
    
    const DatePickerField = ({ name, value, onChange }) => {
        return (
            <DatePicker
                selected={(value && new Date(value)) || null}
                onChange={val => {
                    onChange(name, val);
                }}
            />
        );
    };
    
  const validationSchema=Yup.object().shape({
    cuil: Yup.string().matches(/^\d{11}$/, 'El CUIL debe tener exactamente 11 dígitos numéricos').required("Cuil requerido"),
    apellido: Yup.string().required("Apellido es requerido"),
    nombres: Yup.string().required("Nombres es requerido"),
    categoria: Yup.string().required("Categoria es requerida"),
    fechaingreso: Yup.date()
    .nullable()
    .default(null, "Fecha de ingreso es requerida")
    .test('not-empty', 'Fecha de ingreso es requerida', (value) => value !== null && value !== "")
  })

  const categorias = [
    'Cadete',
    'Aprendiz/Ayudante',
    'Personal auxiliar ',
    'Personal con asignacion',
    'Ayudante en gestion',
    'Personal en gestion',
    'Farmaceutico'
  ];

  

  return (

    <Box sx={{mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center"}}>
      <Avatar sx={{mx: "auto", bgcolor: "#111"}}>
        <HowToRegIcon />
      </Avatar>
      <Typography variant='h5' component="h1">
        Registrar Empleado
      </Typography>
        <Formik
          initialValues={{ cuil: "", apellido: "", nombres: "", categoria: "", fechaingreso: "", licencia: false, reducida: false, sindical: true }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {
            ({values, handleSubmit,handleChange,errors,touched,handleBlur,isSubmitting,setFieldValue})=>(
              // <form onSubmit={handleSubmit}>
              <Box onSubmit={handleSubmit} sx={{mt:1}} component="form">

                <TextField
                  placeholder='cuil' 
                  value={values.cuil} 
                  onChange={handleChange}
                  name="cuil"
                  onBlur={handleBlur}
                  id="cuil"
                  label="Ingrese Cuil sin guiones"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={errors.cuil && touched.cuil}
                  helperText={errors.cuil && touched.cuil && errors.cuil}
                />
                <TextField
                  placeholder='apellido' 
                  value={values.apellido} 
                  onChange={handleChange}
                  name="apellido"
                  onBlur={handleBlur}
                  id="apellido"
                  label="Ingrese apellido"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={errors.apellido && touched.apellido}
                  helperText={errors.apellido && touched.apellido && errors.apellido}
                />
                <TextField
                  placeholder='nombres' 
                  value={values.nombres} 
                  onChange={handleChange}
                  name="nombres"
                  onBlur={handleBlur}
                  id="nombres"
                  label="Ingrese nombres"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={errors.nombres && touched.nombres}
                  helperText={errors.nombres && touched.nombres && errors.nombres}
                />
                <FormControl fullWidth
                >
                  <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="categoria-label"
                            id="categoria"
                            name="categoria"
                            value={values.categoria}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            label="Categoría"
                            sx={{ mb: 3}}
                            error={errors.categoria && touched.categoria}
                            autoWidth
                        >
                            {/* Opciones de categorías generadas dinámicamente */}
                            {categorias.map((categoria) => (
                                <MenuItem key={categoria} value={categoria}>
                                {categoria}
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>    
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <DatePickerField 
                    name="fechaingreso" 
                    value={values.fechaingreso} 
                    onChange={setFieldValue}
                  />
                </LocalizationProvider>  
                
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={values.licencia} onChange={handleChange} name="licencia"/>} label="En licencia" />
                  <FormControlLabel control={<Checkbox checked={values.reducida} onChange={handleChange} name="reducida"/>} label="Jornada reducida" />
                  <FormControlLabel control={<Checkbox checked={values.sindical} onChange={handleChange} name="sindical"/>} label="Sindical " />
                </FormGroup>  
                <LoadingButton
                  type="submit"
                  disabled={isSubmitting} 
                  loading={isSubmitting}
                  variant='contained'
                  fullWidth
                  sx={{ mb: 3 }}
                >Registrar</LoadingButton>  

              </Box>

            )

          }  
        </Formik>
      </Box>  


  )
}

export default Aempleado
