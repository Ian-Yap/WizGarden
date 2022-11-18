import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
export default function AdminDashboard() {
  const { setParent } = useContext(UserContext);
  const history = useNavigate();
  const [allEnglishLessons, setAllEnglishLessons] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:5001/api/admin_get_all_user_details"
        );
        setAllEnglishLessons(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  
  async function deleteRecord(data) {
    console.log(data);
//alert('rr')
   //  confirm('Are you sure, Do you want to delete the record?');
   //
   let ans = window.confirm("Do you really want to delete user ?")
    if (ans) {
      const result = await axios.post("http://localhost:5001/api/admin-delete-user-account",{username:data} );
      const result2 = await axios.get("http://localhost:5001/api/admin_get_all_user_details");
      setAllEnglishLessons(result2.data);
     }
  };
  function editRecord(data) {
    console.log(data);
    setParent(data);
    history('/edit-parent');
      
    }





  const DisplayData = allEnglishLessons.map((info,i) => {
    return (
      <tr key={i}>
        <td >{info.firstname + ' ' + info.lastname} </td>
        <td>{info.mobilenumber}</td>
        <td>{info.childsname}</td>
        <td>{info.childslevel}</td>
        <td>{info.interestedsubjects}</td>
        <td><button onClick={()=>{ editRecord(info) }} >Edit</button>  </td>
        <td><button onClick={()=> deleteRecord(info.emailladdress) } >Delete</button></td>
      </tr>
    );
  });
 
 
 
 
 
 
 
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>          
            <th>Parent Name</th>
            <th>Parent Mobile</th>
            <th>Child Name</th>
            <th>Child Level</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}

