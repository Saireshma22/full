import { useState } from "react";
import api from "../utils/api";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/Login", form);

      if (res.data.token) {
        saveToken(res.data.token);
        localStorage.setItem("token", res.data.token);

        // ✅ Redirect to Notes Dashboard
        nav("/pages/Notes"); // You can also use window.location.href = "/notes";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 p-6 shadow">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-2 p-2 border"
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-4 p-2 border"
      />
      <button className="bg-green-600 text-white py-2 px-4 rounded">
        Login
      </button>
    </form>
  );
}
