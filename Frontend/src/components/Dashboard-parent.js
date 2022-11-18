import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function ParentDashboard() {
  const { username, setParent } = useContext(UserContext);
  //const { firstname,isLogged ,userlevel } = useContext(UserContext);
  const [allEnglishLessons, setAllEnglishLessons] = useState([]);
  const history = useNavigate();
  //console.log( username)

  function editRecord(data) {
    console.log(data);
    setParent(data);
    history("/edit-parent");
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post(
          "http://localhost:5001/api/admin_get_user_details",
          { userName: username }
        );
        setAllEnglishLessons(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const DisplayData = allEnglishLessons.map((info, i) => {
    return (
      <>
        <tr key={i}>
          <td>Parent Name</td>
          <td>{info.firstname + " " + info.lastname} </td>
        </tr>
        <tr key={i + "a1"}>
          <td>Mobile Number</td>
          <td>{info.mobilenumber}</td>
        </tr>
        <tr key={i + "a2"}>
          <td>Childs Name</td>
          <td>{info.childsname}</td>
        </tr>
        <tr key={i + "a3"}>
          <td>Childs Level</td>
          <td>{info.childslevel}</td>
        </tr>
        <tr key={i + "a4"}>
          <td>Subjects</td>
          <td>{info.interestedsubjects}</td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button
              onClick={() => {
                editRecord(info);
              }}
            >
              Edit
            </button>{" "}
          </td>
        </tr>
      </>
    );
  });

  return (
    <div>
      <h3>Parent Details</h3>
      <table className="table table-striped mt-5">
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}
