// import React from "react";
// import axios from "axios";

import { useEffect, useState } from "react";
import axios from "axios";

function EnglishLessons() {
  const [allEnglishLessons, setAllEnglishLessons] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:5001/api/getenglishlessons"
        );
        setAllEnglishLessons(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  const DisplayData = allEnglishLessons.map((info) => {
    return (
      <tr key={info.lesson_id}>
        <td >{info.lesson_id}</td>
        <td>{info.lesson_level}</td>
        <td>{info.lesson_day}</td>
        <td>{info.lesson_time}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Lesson ID</th>
            <th>Lesson Level</th>
            <th>Lesson Day</th>
            <th>Lesson Time</th>
          </tr>
        </thead>
        <tbody>{DisplayData}</tbody>
      </table>
    </div>
  );
}

export default EnglishLessons;

// function EnglishLessons() {
//   const DisplayData = getAllEnglishLessons.map((info) => {
//     return (
//       <tr>
//         <td>{info.lesson_id}</td>
//         <td>{info.lesson_level}</td>
//         <td>{info.lesson_day}</td>
//         <td>{info.lesson_time}</td>
//       </tr>
//     );
//   });

//   return (
//     <div>
//       <table class="table table-striped">
//         <thead>
//           <tr>
//             <th>Lesson ID</th>
//             <th>Lesson Level</th>
//             <th>Lesson Day</th>
//             <th>Lesson Time</th>
//           </tr>
//         </thead>
//         <tbody>{DisplayData}</tbody>
//       </table>
//     </div>
//   );
// }

// export default EnglishLessons;
