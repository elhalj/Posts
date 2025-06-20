import SideBar from "../../SideBar";
import Header from "../../../pages/Header";
import Footer from "../../../pages/Footer";
import { useState } from "react";
import Login from "../../../pages/auth/Login";
import SignUp from "../../../pages/auth/SignUp";
const MainLayout = () => {

    const [showLogin, setShowLogin] = useState<boolean>(false)
    const [showSignUp, setShowSignUp] = useState<boolean>(false)
  return (
    <>
       
      <Header showLogin={showLogin} setShowLogin={setShowLogin} showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      {showLogin && (
            <Login setShowLogin={setShowLogin} showLogin={showLogin}  />
          )}
          {showSignUp && (
            <SignUp setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
          )}
      <SideBar />
      <Footer />
    </>
  );
};

export default MainLayout;

