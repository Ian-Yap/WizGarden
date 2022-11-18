import { useEffect, useState } from "react";
import axios from "axios";

function MathLessons() {
  const [allMathLessons, setAllMathLessons] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          "http://localhost:5001/api/getmathlessons"
        );
        setAllMathLessons(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  });

  const DisplayData = allMathLessons.map((info) => {
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

export default MathLessons;
