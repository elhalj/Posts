import { NavLink, Outlet } from "react-router-dom"
import Header from "../../../pages/Header"
import Nav from "../../Nav"
import Login from "../../../pages/auth/Login"
import SignUp from "../../../pages/auth/SignUp"
import { useState } from "react"


const AuthLayout = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false)
      const [showSignUp, setShowSignUp] = useState<boolean>(false)
  return (
    <>
      {showLogin && (
            <Login setShowLogin={setShowLogin} showLogin={showLogin}  />
          )}
          {showSignUp && (
            <SignUp setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
          )}
      <Header showLogin={showLogin} setShowLogin={setShowLogin} showSignUp={ showSignUp} setShowSignUp={setShowSignUp}/>
      <Nav className="container w-1/3 mx-auto  my-10 flex gap-4 justify-around rounded-lg">
        <div><NavLink to="/dashboard" className="uppercase p-2 border border-slate-50 hover:text-slate-200 rounded-lg">Posts</NavLink></div>
        <div><NavLink to="/dashboard/add" className="uppercase p-2 border border-slate-50 hover:text-slate-200 rounded-lg">Add</NavLink></div>
        <div><NavLink to="/dashboard/modify" className="uppercase p-2 border border-slate-50 hover:text-slate-200 rounded-lg">Modify</NavLink></div>
      </Nav>
      <Outlet />
    </>
  )
}

export default AuthLayout
