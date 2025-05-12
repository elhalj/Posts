
import { useState } from "react"
import Input from "../../components/Input"


const Login = ({ setShowLogin, showLogin }: { setShowLogin: React.Dispatch<React.SetStateAction<boolean>>, showLogin: boolean}) => {
  const field = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email"
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password"
    }
  ]
  
  type LoginFormData = {
    email: string;
    password: string;
  };
  
  const [formData, setFormData] = useState<LoginFormData>({} as LoginFormData);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.email.value);
    // console.log(e.currentTarget.password.value);
  }
  return (
    <div className={`absolute top-4 left-0 w-full h-full flex items-center justify-around bg-transparent z-[999] transform transition duration-500 ease-in-out ${showLogin ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
      
      <div className='container bg-white mx-22 p-1 flex flex-col  w-[600px] h-[600px] rounded-lg shadow-lg' >
        <button type="submit" onClick={() => setShowLogin(false)}>close</button>
        <div className="flex flex-col justify-center items-center">

          <Input fields={field} handleSubmit={handleSubmit} isLoading={false} initialData={formData} submitText="Login" >
            <button type="button"  className='text-white  bg-indigo-900 p-2 m-1 w-sm rounded-full' onClick={() =>  setShowLogin(false)}>Vous n'avez pas de compte ?</button>
          </Input>
        </div>
      </div>
    </div>
  )
}

export default Login


