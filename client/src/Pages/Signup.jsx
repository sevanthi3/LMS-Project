import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  }

  async function createNewAccount(e) {
    e.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.password) {
      toast.error("Please fill all the details");
      return;
    }

    if (signupData.fullName.length < 3) {
      toast.error("Name should be at least 3 characters");
      return;
    }

    if (!signupData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Invalid email id");
      return;
    }

    // ✅ Include role here
    const jsonPayload = {
      fullName: signupData.fullName,
      email: signupData.email,
      password: signupData.password,
      role: "student", // Default role
    };

    setIsLoading(true);
    try {
      const response = await dispatch(createAccount(jsonPayload));
      const data = response?.payload;

      if (data?.success) {
        setSignupData({
          fullName: "",
          email: "",
          password: "",
        });
        toast.success("Registration successful!");
        navigate("/user/profile");
      } else {
        toast.error(data?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong during registration.");
    }

    setIsLoading(false);
  }

  return (
    <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
      <form
        onSubmit={createNewAccount}
        autoComplete="off"
        noValidate
        className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl"
      >
        <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
          Registration Page
        </h1>

        <InputBox
          label={"Name"}
          name={"fullName"}
          type={"text"}
          placeholder={"Enter your name..."}
          onChange={handleUserInput}
          value={signupData.fullName}
        />

        <InputBox
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"Enter your email..."}
          onChange={handleUserInput}
          value={signupData.email}
        />

        <InputBox
          label={"Password"}
          name={"password"}
          type={"password"}
          placeholder={"Enter your password..."}
          onChange={handleUserInput}
          value={signupData.password}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-yellow-500 text-white dark:text-base-200 hover:bg-yellow-300 transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500] text-lg cursor-pointer"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center font-inter text-gray-500 dark:text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="link text-blue-600 font-lato cursor-pointer">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
