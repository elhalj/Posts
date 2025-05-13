import { useState } from "react"
import Input from "../../components/Input"

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

  const [formData, setFormData] = useState<SignUpFormData>({} as SignUpFormData);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  }
  return (
     <div className={`absolute top-4 left-0 w-full h-full flex items-center justify-around bg-transparent z-[999] transform transition duration-500 ease-in-out ${showSignUp ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
      
      <div className='container bg-white mx-22 p-1 flex flex-col  w-[600px] h-[600px] rounded-lg shadow-lg' >
        <button type="submit" onClick={() => setShowSignUp(false)}>close</button>
        <div className="flex flex-col justify-center items-center h-full">

          <Input fields={field} handleSubmit={handleSubmit} isLoading={false} initialData={formData} submitText="Connexion" >
          </Input>
        </div>
      </div>
    </div>
  )
}

export default SignUp
