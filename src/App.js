import { useState } from "react";
import Exercise12 from "./exercises/Exercises12";
import Exercise13 from "./exercises/Exercises13";
import Exercise14 from "./exercises/Exercises14";
import Exercise15 from "./exercises/Exercises15";

function App() {
  const [exercise, setExercise] = useState(12);

  return (
    <div style={{ padding: "20px" }}>
      <h1>React Hook Exercises</h1>

      <button onClick={() => setExercise(12)}>
        Exercise 12
      </button>

      <button onClick={() => setExercise(13)}>
        Exercise 13
      </button>

      <button onClick={() => setExercise(14)}>
        Exercise 14
      </button>

      <button onClick={() => setExercise(15)}>
        Exercise 15
      </button>

      <hr />

      {exercise === 12 && <Exercise12 />}
      {exercise === 13 && <Exercise13 />}
      {exercise === 14 && <Exercise14 />}
      {exercise === 15 && <Exercise15 />}
    </div>
  );
}

export default App;