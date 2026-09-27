import { useEffect, useState } from "react";

// 1. Data Fetching
function UserPosts({ userId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );

        const data = await response.json();

        if (active) {
          setPosts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    setPosts([]);
    fetchData();

    return () => {
      active = false;
    };
  }, [userId]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

// 2. Countdown Timer
function CountdownTimer({ initialValue }) {
  const [timeRemaining, setTimeRemaining] = useState(initialValue);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [timeRemaining]);

  return (
    <div>
      <h3>2. Countdown Timer</h3>
      <p>Time Remaining: {timeRemaining}</p>
    </div>
  );
}

// 3. Window Resize Listener
function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <h3>3. Window Resize Listener</h3>
      <p>
        Window size: {windowSize.width} x {windowSize.height}
      </p>
    </div>
  );
}

// 4. Form Input Validation
function ValidatedInput({ validationFunction, errorMessage }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(validationFunction(value));
  }, [value, validationFunction]);

  return (
    <div>
      <h3>4. Form Input Validation</h3>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={isValid ? "" : "error"}
      />

      {!isValid && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}
    </div>
  );
}

// Hàm kiểm tra được truyền vào ValidatedInput.
function validateInput(value) {
  return value.trim().length >= 3;
}

export default function Exercise13() {
  const [userId, setUserId] = useState(1);

  return (
    <div>
      <h2>Exercise 13: useEffect</h2>

      <h3>1. Data Fetching</h3>

      <label>User ID: </label>
      <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>

      <UserPosts userId={userId} />

      <CountdownTimer initialValue={10} />

      <WindowSize />

      <ValidatedInput
        validationFunction={validateInput}
        errorMessage="Please enter at least 3 characters."
      />
    </div>
  );
}