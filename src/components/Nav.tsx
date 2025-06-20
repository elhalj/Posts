import { ReactNode, useEffect, useState } from "react"

type NavProps = {
    className?: string,
    children?: ReactNode
}

const Nav = ({ className, children }: NavProps) => {
   const [isScrolling, setIsScrolling] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(window.scrollY > 10);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <div className={` items-center p-4 ${isScrolling ? "bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg" : "bg-gray-800"} text-white ${className}`}>
        {children}
    </div>
  )
}

export default Nav
