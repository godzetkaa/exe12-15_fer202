import { useState } from "react";

// 1. Counter
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>1. Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// 2. Controlled Input Field
function ControlledInput() {
  const [text, setText] = useState("");

  return (
    <div>
      <h3>2. Controlled Input Field</h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>You typed: {text}</p>
    </div>
  );
}

// 3. Toggle Visibility
function ToggleVisibility() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <h3>3. Toggle Visibility</h3>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"}
      </button>

      {visible && <p>Hello React!</p>}
    </div>
  );
}

// 4. Todo List
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    if (text.trim() === "") {
      return;
    }

    setTodos([...todos, text.trim()]);
    setText("");
  }

  function deleteTodo(index) {
    setTodos(todos.filter((todo, i) => i !== index));
  }

  return (
    <div>
      <h3>4. Todo List</h3>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <button onClick={() => deleteTodo(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 5. Color Switcher
function ColorSwitcher() {
  const [color, setColor] = useState("red");

  return (
    <div>
      <h3>5. Color Switcher</h3>

      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
      </select>

      <div
        style={{
          backgroundColor: color,
          width: "200px",
          height: "100px",
          marginTop: "10px",
        }}
      />
    </div>
  );
}

// 6. Search Filter
function SearchFilter() {
  const [search, setSearch] = useState("");

  const items = ["Apple", "Banana", "Orange", "Mango", "Grape"];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3>6. Search Filter</h3>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// 7. Drag and Drop List
function DragAndDropList() {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
  ]);

  const [draggingItem, setDraggingItem] = useState(null);

  function handleDragStart(event, index) {
    setDraggingItem(index);
    event.dataTransfer.setData("text/plain", String(index));
  }

  function handleDrop(event, index) {
    event.preventDefault();

    if (draggingItem === null) {
      return;
    }

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggingItem, 1);

    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setDraggingItem(null);
  }

  function handleDragEnd() {
    setDraggingItem(null);
  }

  return (
    <div>
      <h3>7. Drag and Drop List</h3>

      <ul>
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index)}
            onDragEnd={handleDragEnd}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "5px",
              cursor: "grab",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Exercise12() {
  return (
    <div>
      <h2>Exercise 12: useState</h2>
      <Counter />
      <ControlledInput />
      <ToggleVisibility />
      <TodoList />
      <ColorSwitcher />
      <SearchFilter />
      <DragAndDropList />
    </div>
  );
}