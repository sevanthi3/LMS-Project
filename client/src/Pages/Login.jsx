// src/Pages/Login.jsx
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-8">
      <h1 className="text-4xl font-bold text-violet-700 font-inter text-center">
        Choose Login Type
      </h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <button
          onClick={() => navigate("/student-login")}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all"
        >
          Student Login
        </button>

        <button
          onClick={() => navigate("/admin-login")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all"
        >
          Admin Login
        </button>
      </div>
    </section>
  );
}
