import Nav from "../components/Nav"
import logo from '../assets/logo2.jpg'
import { FaUser } from "react-icons/fa";
import {  useState } from "react";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
 
  return (
    <div className="sticky top-0 ">
          <Nav className="container mx-auto mt-2 flex justify-around rounded-full shadow-lg ">
              <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-16 w-16 mr-2 rounded-full" />
                  <h1 className="text-xl font-bold">My Blog</h1>
              </div>
                <div className="flex gap-10 space-x-4">
                    <a href="/" className="text-white hover:text-gray-300">Home</a>
                    <a href="/about" className="text-white hover:text-gray-300">About</a>
          <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
          
          < FaUser onClick={() => setShowLogin(!showLogin)} className="duration-300 cursor-pointer hover:text-gray-500"/>
          {showLogin && (
            <Login setShowLogin={setShowLogin} showLogin={showLogin}  />
          )}
          {showSignUp && (
            <SignUp setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
          )}
                </div>
      </Nav>
    </div>
  )
}
export default Header
