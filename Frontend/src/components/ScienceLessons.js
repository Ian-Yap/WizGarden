import { useEffect, useState } from "react";
import axios from "axios";

function ScienceLessons() {
  const [allScienceLessons, setAllScienceLessons] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:5001/api/getsciencelessons"
        );
        setAllScienceLessons(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  const DisplayData = allScienceLessons.map((info) => {
    return (
      <tr key={info.lesson_id}>
        <td>{info.lesson_id}</td>
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

export default ScienceLessons;
