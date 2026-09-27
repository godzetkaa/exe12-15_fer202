import { createContext, useContext, useState } from "react";

// 1. Theme
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#61dafb",
  },
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState("light");

  function toggleTheme() {
    setThemeName(themeName === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: themes[themeName],
        themeName,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

function Theme() {
  const { theme, themeName, toggleTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <p>Current theme: {themeName}</p>

      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
        }}
      >
        Change Theme
      </button>
    </div>
  );
}

// 2 và 3. Shopping Cart
const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/uthappizza.png",
    category: "mains",
    label: "Hot",
    price: "4.99",
    featured: true,
    description:
      "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/zucchipakoda.png",
    category: "appetizer",
    label: "",
    price: "1.99",
    featured: false,
    description:
      "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/vadonut.png",
    category: "appetizer",
    label: "New",
    price: "1.99",
    featured: false,
    description:
      "A quintessential ConFusion experience, is it a vada or is it a donut?",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/elaicheesecake.png",
    category: "dessert",
    label: "",
    price: "2.99",
    featured: false,
    description:
      "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms",
  },
];

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(dish) {
    const existingItem = cartItems.find((item) => item.id === dish.id);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCartItems([]);
  }

  const totalCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalValue = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalCount,
        totalValue,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function DishesList() {
  const { addToCart, totalCount, totalValue } = useContext(CartContext);

  return (
    <div>
      <h3>2. Dishes List</h3>

      <p>
        Cart: {totalCount} items — ${totalValue.toFixed(2)}
      </p>

      {dishes.map((dish) => (
        <div key={dish.id}>
          <h4>{dish.name}</h4>
          <p>{dish.description}</p>
          <p>Price: ${dish.price}</p>

          <button onClick={() => addToCart(dish)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    totalCount,
    totalValue,
  } = useContext(CartContext);

  return (
    <div>
      <h3>3. Cart — Real-time Count and Value</h3>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} — ${item.price} x {item.quantity}{" "}
            <button onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <p>Total items: {totalCount}</p>
      <p>Total value: ${totalValue.toFixed(2)}</p>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
}

export default function Exercise14() {
  return (
    <div>
      <h2>Exercise 14: useContext</h2>

      <h3>1. Theme</h3>
      <ThemeProvider>
        <Theme />
      </ThemeProvider>

      <CartProvider>
        <DishesList />
        <Cart />
      </CartProvider>
    </div>
  );
}