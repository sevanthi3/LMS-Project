import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputBox from "../InputBox/InputBox";
import { login } from "../../Redux/Slices/AuthSlice"; // ✅ Adjust path if needed

export default function StudentLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await dispatch(login(loginData));
      const user = response?.payload?.user;

      if (user) {
        toast.success("Login successful!");
        navigate("/user/profile");
      } else {
        toast.error(response?.payload?.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
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
          Student Login
        </h1>

        <InputBox
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"Enter your email"}
          onChange={handleUserInput}
          value={loginData.email}
        />

        <InputBox
          label={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"Enter your password"}
          onChange={handleUserInput}
          value={loginData.password}
        />

        <button
          type="submit"
          className="mt-2 bg-green-500 text-white transition-all ease-in-out duration-300 rounded-md py-2 font-medium text-lg cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login as Student"}
        </button>

        {/* ✅ Back Button */}
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
