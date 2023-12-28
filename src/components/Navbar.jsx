import { NavLink } from "react-router-dom"
// import { useContext } from "react";
// import { UserContext } from "../context/userContext";

import { useUserContext } from "../context/userContext";

const Navbar = () => {

    //console.log(useUserContext());
    const { user,setUser}=useUserContext();

  return (
    <>
        <nav>
            <NavLink to="/">Home |</NavLink>
            {
                user && (
                    <>
                        <NavLink to="/dashboard">Dashboard</NavLink>                
                        <button onClick={()=>setUser(false)}>Logout</button>    
                    </>
                )
            }
        </nav>
    </>
  )
}

export default Navbar;