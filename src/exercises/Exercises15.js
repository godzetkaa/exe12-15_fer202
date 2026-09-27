import { useReducer } from "react";

// 1. Counter
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "RESET":
      return 0;

    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <h3>1. Counter</h3>
      <p>Count: {count}</p>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        +
      </button>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        -
      </button>

      <button onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </div>
  );
}

// 2. Question Bank

// Khởi tạo state theo mẫu trong đề
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

// Xử lý các action theo đề
function reducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return {
        ...state,
        selectedOption: action.payload,
      };

    case "NEXT_QUESTION": {
      if (state.selectedOption === "" || state.showScore) {
        return state;
      }

      const currentQuestion = state.questions[state.currentQuestion];

      // Tính điểm của câu vừa trả lời
      let newScore = state.score;

      if (state.selectedOption === currentQuestion.answer) {
        newScore = newScore + 1;
      }

      const nextQuestion = state.currentQuestion + 1;

      // Nếu còn câu hỏi thì chuyển sang câu tiếp theo
      if (nextQuestion < state.questions.length) {
        return {
          ...state,
          currentQuestion: nextQuestion,
          selectedOption: "",
          score: newScore,
        };
      }

      // Nếu hết câu hỏi thì hiển thị kết quả
      return {
        ...state,
        score: newScore,
        showScore: true,
      };
    }

    case "RESTART_QUIZ":
      return initialState;

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
  } = state;

  function handleOptionSelect(option) {
    dispatch({
      type: "SELECT_OPTION",
      payload: option,
    });
  }

  function handleNextQuestion() {
    dispatch({ type: "NEXT_QUESTION" });
  }

  function handleRestartQuiz() {
    dispatch({ type: "RESTART_QUIZ" });
  }

  const buttonStyle = {
    fontSize: "26px",
    padding: "5px 10px",
    cursor: "pointer",
    color: "black",
    backgroundColor: "#efefef",
    border: "2px outset #aaaaaa",
    borderRadius: 0,
  };

  return (
    <div
      style={{
        backgroundColor: "#282c34",
        color: "white",
        textAlign: "center",
        padding: "40px 20px",
        marginTop: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {showScore ? (
        <div>
          <h1 style={{ fontSize: "48px", margin: "0 0 20px" }}>
            Your Score: {score}/{questions.length}
          </h1>

          <button
            style={{ ...buttonStyle, fontSize: "36px" }}
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 style={{ fontSize: "36px", margin: "0 0 15px" }}>
            Question {currentQuestion + 1}
          </h2>

          <h3 style={{ fontSize: "30px", margin: "0 0 15px" }}>
            {questions[currentQuestion].question}
          </h3>

          <div>
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                style={buttonStyle}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === ""}
            style={{
              ...buttonStyle,
              opacity: selectedOption === "" ? 0.3 : 1,
              cursor: selectedOption === "" ? "default" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function Exercise15() {
  return (
    <div>
      <h2>Exercise 15: useReducer</h2>
      <Counter />
      <QuestionBank />
    </div>
  );
}