import { NavLink, Outlet } from "react-router-dom"
import Header from "../../../pages/Header"
import Nav from "../../Nav"


const AuthLayout = () => {
  return (
    <>
      <Header />
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
