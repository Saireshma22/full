import api from "../utils/api";

export default function NoteList({ notes, onDeleted }){
  const deleteNote = async (id) => {
    if(!confirm("Delete note?")) return;
    await api.delete(`/notes/${id}`);
    onDeleted();
  };
  if(!notes.length) return <p>No notes.</p>;
  return (
    <ul>
      {notes.map(n => (
        <li key={n._id} className="border p-2 mb-2 rounded">
          <div className="flex justify-between">
            <h3 className="font-semibold">{n.title}</h3>
            <div>
              <button onClick={()=>deleteNote(n._id)} className="text-red-600 ml-2">Delete</button>
            </div>
          </div>
          <p>{n.content}</p>
          <div className="text-sm text-gray-500">{(n.tags||[]).join(", ")}</div>
        </li>
      ))}
    </ul>
  );
}
