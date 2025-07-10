import { useState } from "react"

const SignUp = ({setShowSignUp, showSignUp}: {setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>, showSignUp: boolean }) => {
  const field = [
    {
      label: "name",
      type: "text",
      name: "name",
      placeholder: "Enter your name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Enter your password",
    }
  ]

  type SignUpFormData = {
    name: string;
    email: string;
    password: string;
  };

  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: ""
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof SignUpFormData]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  }
  return (
     <div className={`sticky  top-4 left-0 w-full h-screen flex items-center justify-around bg-blue-500/50 backdrop-blur-lg rounded-lg z-[999] transform transition duration-500 ease-in-out ${showSignUp ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
      
      <div className='container bg-white mx-22 p-1 flex flex-col  w-[600px] h-[600px] rounded-lg shadow-lg' >
        <button type="submit" onClick={() => setShowSignUp(false)}>close</button>
        <div className="flex flex-col justify-center items-center h-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {field.map(input => (
              <div key={input.name} className="flex flex-col">
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  className="p-2 border-2 rounded-md"
                  value={formData[input.name] || formData.name}
                  onChange={e => setFormData({...formData, [input.name]: e.target.value})}
                />
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Sign Up</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default SignUp
