import { Link, Outlet } from "react-router-dom";
import Nav from "./Nav";
import { BiSolidHome } from "react-icons/bi";
import { FaSatelliteDish } from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="flex items-start mt-6 mx-4">
      <Nav className="flex flex-col justify-center items-center gap-4 h-[800px] w-[300px] rounded-full shadow-lg ">
        <p className="flex flex-row justify-center items-center bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/dashboard">Dashboard</Link> <BiSolidHome className="inline-block ml-2" size={20} />
        </p>
        <p className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/settings">Settings</Link> <FaSatelliteDish className="inline-block ml-2" size={20} />
        </p>
        <p className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          <Link to="/profile">Profile</Link>
        </p>
      </Nav>
      <Outlet />
          <Nav className="flex flex-col justify-center items-center gap-4 h-[800px] w-[300px] rounded-full shadow-lg -z-10">
              <ul className="flex flex-col gap-4">
                  {/* <li><Link to="/1" className="text-white">3</Link></li>
                  <li><Link to="/2" className="text-white">1</Link></li>
                  <li><Link to="/2" className="text-white">2</Link></li> */}
                  <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
        </ul>
          </Nav>
          <Outlet />
    </div>
  );
};

export default SideBar;
