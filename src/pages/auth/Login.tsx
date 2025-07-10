import { useState } from "react";

 type LoginFormData = {
    email: string;
    password: string;
 };
  
const Login = ({
  setShowLogin,
  showLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showLogin: boolean;
}) => {
 
  const [formData, setFormData] = useState<LoginFormData>({} as LoginFormData);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.email.value);
    // console.log(e.currentTarget.password.value);
  };
  return (
    <div
      className={`sticky top-4 left-0 w-full h-screen flex items-center justify-around bg-blue-500/50 backdrop-blur-lg rounded-lg z-[999] transform transition duration-500 ease-in-out ${
        showLogin ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
    >
      <div className="container bg-white mx-22 p-1 flex flex-col  w-[600px] h-[600px] rounded-lg shadow-lg">
        <button type="submit" onClick={() => setShowLogin(false)}>
          close
        </button>
        <div className="flex flex-col justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="p-2 border-2 rounded-lg"
          />
          <label htmlFor="password" className="text-lg">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="p-2 border-2 rounded-lg"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            Connexion
          </button>
        </form>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
