import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);

  async function getNotes() {
    const response = await axios.get("http://localhost:3100/notes");
    setNotes(response.data.data);
  }

  async function addNote() {
    await axios.post("http://localhost:3100/add", {
      id: Math.random().toString(),
      title: title,
      content: content,
    });
    setContent("");
    setTitle("");
    getNotes();
  }

  useEffect(() => {
    getNotes();
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      justifyContent: "center",
      backgroundColor: "#f8fafc",
      padding: "20px",
    },
    form: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      outline: "none",
      width: "200px",
      transition: "0.3s",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#4F46E5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "0.3s",
    },
    table: {
      borderCollapse: "collapse",
      width: "80%",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "white",
    },
    th: {
      backgroundColor: "#4F46E5",
      color: "white",
      padding: "12px",
      textAlign: "left",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
      color: "#1f2937", // Dark text for contrast
    },
  };

  return (
    <div style={styles.container}>
      <motion.div
        style={styles.form}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <input
          style={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
        />
        <input
          style={styles.input}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Enter content"
        />
        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addNote}
        >
          ADD
        </motion.button>
      </motion.div>

      <motion.table
        style={styles.table}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Content</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <motion.tr
              key={note.id}
              whileHover={{
                backgroundColor: "#e0e7ff", // Light blue background
                color: "#1f2937", // Keep text dark
              }}
              transition={{ duration: 0.2 }}
            >
              <td style={styles.td}>{note.title}</td>
              <td style={styles.td}>{note.content}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
}

export default App;
