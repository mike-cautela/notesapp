import React, { useState } from "react";
import "./App.css";

/**
 * Example user data taken from your Users.json structure.
 * Normally, you would fetch this from a backend.
 */
const mockUsers = [
  {
    username: "john_doe",
    password: "abc123",
    orders: [
      { orderId: 1, date: "2025-01-14T10:00:00" },
      { orderId: 2, date: "2025-01-14T11:00:00" },
    ],
  },
  {
    username: "jane_smith",
    password: "pass123",
    orders: [
      { orderId: 3, date: "2025-01-14T12:00:00" },
      { orderId: 4, date: "2025-01-14T13:00:00" },
    ],
  },
];

/**
 * Example menu data taken from your Menu.json.
 * In a real app, you'd fetch this data from a C# Web API or similar.
 */
const mockMenu = [
  { id: 1, name: "Chipotle Chicken Avocado Melt", price: 8.99 },
  { id: 2, name: "Mediterranean Veggie Sandwich", price: 7.59 },
  { id: 3, name: "Broccoli Cheddar Soup", price: 5.99 },
  { id: 4, name: "Fuji Apple Salad with Chicken", price: 8.59 },
  { id: 5, name: "Ten Vegetable Soup", price: 4.99 },
  // ... Paste the rest of your items here or fetch them dynamically
];

/**
 * Returns an emoji (or multiple) based on keywords found in the menu item's name.
 * Feel free to customize or expand this logic.
 */
function getEmojiForMenuItem(name) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("chicken")) return "🍗";
  if (lowerName.includes("avocado")) return "🥑";
  if (lowerName.includes("veggie") || lowerName.includes("vegetable")) return "🥕";
  if (lowerName.includes("soup")) return "🥣";
  if (lowerName.includes("salad")) return "🥗";
  if (lowerName.includes("bagel")) return "🥯";
  if (lowerName.includes("muffin")) return "🧁";
  if (lowerName.includes("cookie")) return "🍪";
  if (lowerName.includes("mac") || lowerName.includes("cheese")) return "🧀";
  if (lowerName.includes("bread") || lowerName.includes("sandwich")) return "🥪";
  if (lowerName.includes("apple")) return "🍎";
  if (lowerName.includes("bbq")) return "🔥";
  // Default fallback
  return "🍽️";
}

function App() {
  // State for tracking user login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  // State for tracking which "section" is displayed
  const [showMenu, setShowMenu] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  // State for menu items
  const [menuItems, setMenuItems] = useState(mockMenu);

  // ---- LOGIN FUNCTIONALITY ----
  const handleLogin = (e) => {
    e.preventDefault();

    // Mimic your UserService userLogin
    const userFound = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      setLoggedIn(true);
      setCurrentUser(userFound);
      setError("");
      setShowMenu(false);
      setShowUsers(false);
    } else {
      setError("Invalid Username or Password.");
    }
  };

  // ---- MENU FUNCTIONALITY ----
  const handleShowMenu = () => {
    setShowMenu(true);
    setShowUsers(false);
  };

  const handleSortMenu = () => {
    const sorted = [...menuItems].sort((a, b) => a.price - b.price);
    setMenuItems(sorted);
  };

  // ---- USERS FUNCTIONALITY ----
  const handleShowUsers = () => {
    setShowMenu(false);
    setShowUsers(true);
  };

  // ---- LOGOUT ----
  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setCurrentUser(null);
    setShowMenu(false);
    setShowUsers(false);
  };

  return (
    <div className="App" style={styles.app}>
      <h1 style={styles.title}>Panera Order App</h1>

      {!loggedIn && (
        <div style={styles.loginContainer}>
          <h2 style={{ color: styles.headingColor }}>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <label style={styles.label}>Username</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button style={styles.button} type="submit">
              Log In
            </button>
          </form>
          {error && <p style={styles.error}>{error}</p>}
        </div>
      )}

      {loggedIn && currentUser && (
        <div style={styles.dashboard}>
          <h2 style={{ color: styles.headingColor }}>
            Welcome, {currentUser.username}!
          </h2>
          <div style={styles.navBar}>
            <button style={styles.button} onClick={handleShowMenu}>
              View Menu
            </button>
            <button style={styles.button} onClick={handleSortMenu}>
              Sort Menu by Price
            </button>
            <button style={styles.button} onClick={handleShowUsers}>
              List Users
            </button>
            <button style={styles.button} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {loggedIn && showMenu && (
        <div style={styles.section}>
          <h3 style={{ color: styles.headingColor }}>Menu Items</h3>
          <table style={styles.table}>
            <thead>
              <tr style={{ backgroundColor: "#c1dbb3" }}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.id}</td>
                  <td style={styles.td}>
                    {getEmojiForMenuItem(item.name)} {item.name}
                  </td>
                  <td style={styles.td}>{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loggedIn && showUsers && (
        <div style={styles.section}>
          <h3 style={{ color: styles.headingColor }}>All Users</h3>
          {mockUsers.map((u) => (
            <div key={u.username} style={styles.userCard}>
              <p style={styles.userText}>
                <strong>Username:</strong> {u.username}
              </p>
              <p style={styles.userText}>
                <strong>Orders:</strong>
              </p>
              {u.orders && u.orders.length > 0 ? (
                <ul>
                  {u.orders.map((order) => (
                    <li key={order.orderId} style={styles.userText}>
                      Order ID: {order.orderId}, Date: {order.date}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={styles.userText}>No orders found</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- STYLES ----
// Adjust these colors/values as needed for a Panera-inspired green theme
const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#e9f5e9", // Pale green background
    color: "#2d2d2d", // Dark gray text for readability
    minHeight: "100vh",
    padding: "1rem",
    textAlign: "center",
  },
  headingColor: "#435e43", // A deeper green for headings
  title: {
    marginBottom: "2rem",
    color: "#2f4f2f",
  },
  loginContainer: {
    width: "300px",
    margin: "0 auto",
    padding: "1rem",
    border: "1px solid #b2d8ac",
    borderRadius: "0.5rem",
    backgroundColor: "#ffffff",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.2rem",
  },
  input: {
    marginBottom: "0.5rem",
    padding: "0.5rem",
    border: "1px solid #b2d8ac",
    borderRadius: "0.25rem",
  },
  button: {
    margin: "0.5rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    backgroundColor: "#b2d8ac", // Light green button
    border: "none",
    borderRadius: "0.25rem",
    color: "#2d2d2d",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: "0.5rem",
  },
  dashboard: {
    margin: "1rem auto",
    width: "80%",
    maxWidth: "600px",
    textAlign: "left",
  },
  navBar: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginTop: "1rem",
  },
  section: {
    width: "80%",
    maxWidth: "600px",
    margin: "1rem auto",
    textAlign: "left",
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #b2d8ac",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fefefe",
  },
  th: {
    padding: "0.5rem",
    border: "1px solid #b2d8ac",
    textAlign: "left",
    color: "#2f4f2f",
  },
  td: {
    padding: "0.5rem",
    border: "1px solid #b2d8ac",
    color: "#2d2d2d",
  },
  userCard: {
    marginBottom: "1rem",
    border: "1px solid #b2d8ac",
    borderRadius: "0.3rem",
    padding: "0.5rem",
    textAlign: "left",
    backgroundColor: "#fefefe",
  },
  userText: {
    margin: "0.2rem 0",
    color: "#2d2d2d",
  },
};

export default App;