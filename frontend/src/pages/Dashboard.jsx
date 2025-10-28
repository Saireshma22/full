import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.log("Error loading notes", err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Notes</h2>

      {notes.map(n => (
        <div key={n._id} className="border p-3 mb-2">{n.title}</div>
      ))}
    </div>
  );
}
