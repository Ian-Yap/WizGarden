import { UserContext } from "../context/UserContext";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export default function Dashboard() {
 // const [name,setLoginname] = useState("");
  const { parent,userlevel } = useContext(UserContext);
  const history = useNavigate();

  console.log(parent)

  function goback() {
    if (userlevel == 1) {
      history('/admin-dashboard');
   }
   if (userlevel == 2) {
     history('/parent-dashboard');
  }
  
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.firstname.value);
    

   const result = await axios.post("http://localhost:5001/api/user_update_details",
    {
      username: parent.emailladdress.toLowerCase(),
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      mobileNumber: e.target.mobilenumber.value,
      childsName: e.target.childsname.value,
      childsLevel: e.target.childslevel.value,
      interestedSubjects: e.target.subjects.value


    });
    
 
    if (result.data.status === 'ok') {   
          
      alert('Data Updated');

      if (userlevel == 1) {
         history('/admin-dashboard');
      }
      if (userlevel == 2) {
        history('/parent-dashboard');
     }
     
       
     
      
   
    }
    else {
      alert('Data Saving Error')
    }
     


}





  return(
    <>
      <h3>Edit Parent Details</h3>
      <form  onSubmit={handleSubmit}>
        
    
      <table className="table table-striped">
        <tbody>

       
        <tr>
          <td>First Name</td>
          <td>
          <input
                className="inputBox"
                defaultValue={parent.firstname}
                //onChange={(e) => setLoginname(e.target.value)}
                type="text"
                placeholder="user Name"
                id="firstname"
                name="firstname"
              />
          </td>
          </tr>
          
          <tr>
          <td>Last Name</td>
          <td>
          <input
                className="inputBox"
                defaultValue={parent.lastname}
              //  onChange={(e) => setLoginname(e.target.value)}
                type="text"
                placeholder="Last Name"
                id="lastname"
                name="lastname"
              />
          </td>
          </tr>
          <tr>
          <td>Mobile Number</td>
          <td>
          <input
                className="inputBox"
                defaultValue={parent.mobilenumber}
              //  onChange={(e) => setLoginname(e.target.value)}
                type="text"
                placeholder="Mobile Number"
                id="mobilenumber"
                name="mobilenumber"
              />
          </td>
          </tr>
          
          <tr>
          <td>Child name</td>
          <td>
          <input
                className="inputBox"
                defaultValue={parent.childsname}
              //  onChange={(e) => setLoginname(e.target.value)}
                type="text"
                placeholder="Child Name"
                id="childsname"
                name="childsname"
              />
          </td>
          </tr>
          
          <tr>
          <td>Childs Level</td>
          <td>
          <input
                className="inputBox"
                defaultValue={parent.childslevel}
              //  onChange={(e) => setLoginname(e.target.value)}
                type="text"
                placeholder="childs level"
                id="childslevel"
                name="childslevel"
              />
          </td>
          </tr>
          
          <tr>
          <td>Subjects</td>
          <td>
          <input
                className="inputBox"
                defaultValue={parent.interestedsubjects}
              //  onChange={(e) => setLoginname(e.target.value)}
                type="text"
                placeholder="Subjects"
                id="subjects"
                name="subjects"
              />
          </td>
          </tr>
          <tr>
            <td align="center" onClick={()=>{goback()}} > <button>Back</button></td>
            <td align="center"> <button type="submit" >Update</button> </td>
          </tr>


       </tbody>
        </table>
        </form>
  </>);
}
