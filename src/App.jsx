import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  function login(e) {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      const payload = {
        userId: 101,
        role: "admin",
      };

      // Simulated JWT
      const token = btoa(JSON.stringify(payload));

      // Store token
      localStorage.setItem("jwt_token", token);

      setUser(payload);
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  }

  function logout() {
    localStorage.removeItem("jwt_token");
    setLoggedIn(false);
    setUser(null);
  }

  if (loggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1>Dashboard</h1>

          <div style={styles.success}>
            Login Successful
          </div>

          <h3>User Information</h3>

          <p>
            <strong>User ID:</strong> {user.userId}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            <span style={styles.role}>{user.role}</span>
          </p>

          <p>
            This is a protected Dashboard.
          </p>

          <button style={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>JWT Login</h1>

        <p>Simple React Authentication</p>

        <form onSubmit={login}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.login} type="submit">
            Login
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.demo}>
          <strong>Demo Login</strong>
          <br />
          Username: admin
          <br />
          Password: 1234
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "400px",
    padding: "35px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },

  login: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },

  logout: {
    padding: "12px 25px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  error: {
    color: "red",
  },

  success: {
    padding: "10px",
    backgroundColor: "#dcfce7",
    color: "#166534",
    borderRadius: "6px",
    margin: "20px 0",
  },

  role: {
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
    padding: "5px 10px",
    borderRadius: "15px",
  },

  demo: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    lineHeight: "1.6",
  },
};

export default App;