export default function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  // ... rest remains unchanged

  return (
    <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
      <form
        onSubmit={onFormSubmit}
        autoComplete="off"
        noValidate
        className="flex flex-col dark:bg-base-100 gap-7 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[750px] w-full shadow-custom dark:shadow-xl"
      >
        <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter">
          Create New Course
        </h1>
        {/* ...form fields... */}
        <button
          type="submit"
          disabled={isCreatingCourse}
          className="mt-3 bg-yellow-500 text-white dark:text-base-200 transition-all ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500] text-lg cursor-pointer"
        >
          {isCreatingCourse ? "Creating Course..." : "Create Course"}
        </button>
      </form>
    </section>
  );
}
