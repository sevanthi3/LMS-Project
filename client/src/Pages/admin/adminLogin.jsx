import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../Components/InputBox/InputBox";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserLoggedIn } from "../../Redux/Slices/AuthSlice";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "admin",
    password: "admin",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);

    if (loginData.username === "admin" && loginData.password === "admin") {
      const adminUser = {
        fullName: "Admin",
        email: "admin@lms.com",
        role: "admin",
      };

      dispatch(
        setUserLoggedIn({
          role: "admin",
          data: adminUser,
        })
      );

      toast.success("Admin login successful!");

      // ✅ Force Navbar to re-render by navigating away first
      navigate("/", { replace: true });
      setTimeout(() => navigate("/admin"), 50);
    } else {
      toast.error("Invalid credentials");
    }

    setIsLoading(false);
  }

  return (
    <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white dark:bg-base-100 gap-4 rounded-lg md:py-6 py-7 md:px-7 px-4 md:w-[500px] w-full shadow-custom dark:shadow-xl"
      >
        <h1 className="text-center text-3xl font-bold text-purple-600 font-inter">
          Admin Login
        </h1>

        <InputBox
          label={"Username"}
          name={"username"}
          type={"text"}
          placeholder={"username - admin"}
          onChange={handleUserInput}
          value={loginData.username}
        />

        <InputBox
          label={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"password - admin"}
          onChange={handleUserInput}
          value={loginData.password}
        />

        <button
          type="submit"
          className="mt-2 bg-green-400 text-white transition-all ease-in-out duration-300 rounded-md py-2 font-medium text-lg cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login as Admin"}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="self-start mt-2 text-blue-600 hover:underline text-lg"
        >
          ← Back
        </button>
      </form>
    </section>
  );
}
