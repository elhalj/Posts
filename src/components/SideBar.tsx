
import { Link, Outlet } from "react-router-dom"
import Nav from "./Nav"


const SideBar = () => {
  return (
    <div className="flex items-start mt-6 mx-4">
          <Nav className="flex flex-col justify-center items-center gap-4 h-[800px] w-[300px] rounded-full shadow-lg">
              <ul className="flex flex-col gap-4">
                  <li><Link to="/1" className="text-white">3</Link></li>
                  <li><Link to="/2" className="text-white">1</Link></li>
                  <li><Link to="/2" className="text-white">2</Link></li>
                  <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
        </ul>
          </Nav>
          <Outlet />
    </div>
  )
}

export default SideBar
