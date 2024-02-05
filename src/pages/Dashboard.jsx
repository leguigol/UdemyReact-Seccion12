import { useEffect } from "react";
import { logout } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const { user,cuit,setCuit,razon,setRazon }=useUserContext();
    const navigate = useNavigate();

    const handleLogout=async()=>{
        try{
            await logout();
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchFarmacias = async () => {
          if (user && user.uid) {
            try {
              const farmaciasCollection = collection(db,'farmacias');
              const q=query(farmaciasCollection, where("uid","==",user.uid));
              const docs = await getDocs(q);
              
              const res=[];

              docs.forEach(farmas=>{
                res.push({
                    id:farmas.uid,
                    ...farmas.data()    
                })
              })
              if (res.length > 0) {
                setCuit(res[0].cuit);
                setRazon(res[0].razonsocial);
            } else {
                console.log("No se encontraron documentos.");
                navigate('/registro-farmacia')
            }
            } catch (error) {
              console.error('Error al obtener la colección de farmacias:', error);
            }
          }
        };
      
        fetchFarmacias();
    }, [user]);

    return (
        <>
            <h1>Dashboard - ruta protegida</h1>
            <h2>Bienvenido: {razon}</h2>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard;
