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
 * Again, in a real app you'd fetch this data from a C# Web API.
 */
const mockMenu = [
  {
    id: 1,
    name: "Chipotle Chicken Avocado Melt",
    price: 8.99,
  },
  {
    id: 2,
    name: "Mediterranean Veggie Sandwich",
    price: 7.59,
  },
  {
    id: 3,
    name: "Broccoli Cheddar Soup",
    price: 5.99,
  },
  // ... you can paste the rest of your menu items here
];

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
          <h2>Login</h2>
          <form onSubmit={handleLogin} style={styles.form}>
            <label>Username</label>
            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password</label>
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
          <h2>Welcome, {currentUser.username}!</h2>
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
          <h3>Menu Items</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loggedIn && showUsers && (
        <div style={styles.section}>
          <h3>All Users</h3>
          {mockUsers.map((u) => (
            <div key={u.username} style={styles.userCard}>
              <p>
                <strong>Username:</strong> {u.username}
              </p>
              <p>
                <strong>Orders:</strong>
              </p>
              {u.orders && u.orders.length > 0 ? (
                <ul>
                  {u.orders.map((order) => (
                    <li key={order.orderId}>
                      Order ID: {order.orderId}, Date: {order.date}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No orders found</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- STYLES ----
const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    padding: "1rem",
    textAlign: "center",
  },
  title: {
    marginBottom: "2rem",
  },
  loginContainer: {
    width: "300px",
    margin: "0 auto",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "0.5rem",
    textAlign: "left",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: "0.5rem",
    padding: "0.5rem",
  },
  button: {
    margin: "0.5rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
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
  },
  section: {
    width: "80%",
    maxWidth: "600px",
    margin: "1rem auto",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  userCard: {
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "0.3rem",
    padding: "0.5rem",
    textAlign: "left",
  },
};

export default App;