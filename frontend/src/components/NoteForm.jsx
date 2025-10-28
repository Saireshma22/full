import { useState } from "react";
import api from "../utils/api";

export default function NoteForm({ onSaved }){
  const [note, setNote] = useState({ title:"", content:"", tags:"" });
  const save = async (e) => {
    e.preventDefault();
    try {
      const payload = { title: note.title, content: note.content, tags: note.tags ? note.tags.split(",").map(t=>t.trim()):[] };
      await api.post("/notes/add", payload); // backend route /api/notes/add
      setNote({ title:"", content:"", tags:"" });
      onSaved();
    } catch (err) {
      alert("Save failed");
    }
  };
  return (
    <form onSubmit={save} className="p-2 border rounded mb-4">
      <input value={note.title} onChange={e=>setNote({...note,title:e.target.value})} placeholder="Title" className="w-full p-2 mb-2 border"/>
      <input value={note.tags} onChange={e=>setNote({...note,tags:e.target.value})} placeholder="tags (comma separated)" className="w-full p-2 mb-2 border"/>
      <textarea value={note.content} onChange={e=>setNote({...note,content:e.target.value})} placeholder="Content" className="w-full p-2 mb-2 border"/>
      <button className="bg-blue-600 text-white py-1 px-3 rounded">Save</button>
    </form>
  );
}
