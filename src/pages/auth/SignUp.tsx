import { useState } from "react";

  type SignUpFormData = {
    name: string;
    email: string;
    password: string;
  };

const SignUp = ({
  setShowSignUp,
  showSignUp,
}: {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  showSignUp: boolean;
  }) => {
  
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof SignUpFormData]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div
      className={`sticky  top-4 left-0 w-full h-screen flex items-center justify-around bg-blue-500/50 backdrop-blur-lg rounded-lg z-[999] transform transition duration-500 ease-in-out ${
        showSignUp ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <div className="container bg-white mx-22 p-1 flex flex-col  w-[600px] h-[600px] rounded-lg shadow-lg">
        <button type="submit" onClick={() => setShowSignUp(false)}>
          close
        </button>
        <div className="flex flex-col justify-center items-center h-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
