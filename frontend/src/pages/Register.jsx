import { useState } from "react";
import api from "../utils/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    // client validation
    if(!form.name || !form.email || form.password.length < 6) {
      alert("Fill fields; password >=6");
      return;
    }
    try {
      const res = await api.post("/auth/register", form);
      // if your backend returns token, save
      if(res.data.token) saveToken(res.data.token);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 shadow">
      <h2 className="text-xl mb-4">Register</h2>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full mb-2 p-2 border" />
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mb-2 p-2 border" />
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full mb-4 p-2 border" />
      <button className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
    </form>
  );
}
