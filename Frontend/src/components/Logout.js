import { useNavigate } from 'react-router-dom';
import React, { useContext ,useEffect} from "react";
import { UserContext } from '../context/UserContext';

const Logout=()=> {
  const { setIsLogged, setFirstname } = useContext(UserContext);
  const history = useNavigate();
  
  useEffect(() => {
 setIsLogged(false);
  setFirstname("");  

  history('/loginpage');

  });
  
 return "<h4>Logout</h4> "


  
}

export default Logout;
