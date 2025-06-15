import React, { useState } from "react";
import { toast } from "react-hot-toast";
import InputBox from "../Components/InputBox/InputBox";
import TextArea from "../Components/InputBox/TextArea";
import { isEmail } from "../Helpers/regexMatcher";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email format");
      return;
    }

    const loadingToast = toast.loading("Sending message...");
    setIsLoading(true);

    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success("Message sent. We’ll contact you shortly!");
      setUserInput({ name: "", email: "", message: "" });
      setIsLoading(false);
    }, 2000);
  }

  return (
    <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
      <form
        onSubmit={onFormSubmit}
        autoComplete="off"
        noValidate
        className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px] w-full shadow-custom dark:shadow-xl"
      >
        <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
          Contact Form
        </h1>

        <InputBox
          label={"Name"}
          name={"name"}
          type={"text"}
          placeholder={"Enter your name..."}
          onChange={handleInputChange}
          value={userInput.name}
        />

        <InputBox
          label={"Email"}
          name={"email"}
          type={"email"}
          placeholder={"Enter your email..."}
          onChange={handleInputChange}
          value={userInput.email}
        />

        <TextArea
          label={"Message"}
          name={"message"}
          rows={4}
          placeholder={"Enter your message..."}
          onChange={handleInputChange}
          value={userInput.message}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-yellow-500 text-white dark:text-base-200 transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500] text-lg cursor-pointer"
        >
          {isLoading ? "Submitting Form..." : "Submit Form"}
        </button>
      </form>
    </section>
  );
}
