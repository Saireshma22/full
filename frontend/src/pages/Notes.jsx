import React, { useState, useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      alert("Login required!");
      return;
    }
    setToken(savedToken);
    fetchNotes(savedToken);
  }, []);

  const fetchNotes = async (authToken) => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setNotes(res.data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    if (!title || !content) {
      alert("All fields required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNotes([...notes, res.data.note]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Notes</h2>

      {/* Add Note Form */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      /><br /><br />

      <button onClick={addNote}>Add Note</button>

      <hr />

      {/* Notes List */}
      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} style={{ marginBottom: "15px", border: "1px solid gray", padding: "10px" }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;
