import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const Home = () => {

    const {user,setUser}=useUserContext()
    const navigate=useNavigate();

    const handleLogin=()=>{
        setUser(true);
        navigate('/dashboard');
    }
  return (
    <>
      <h1>home</h1>
      <button onClick={handleLogin}>Login</button>  
    </>
  )
}

export default Home;
