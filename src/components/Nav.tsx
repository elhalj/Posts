import { ReactNode } from "react"

type NavProps = {
    className?: string,
    children?: ReactNode
}

const Nav = ({className, children}: NavProps) => {
  return (
    <div className={` items-center p-4 bg-gray-800 text-white ${className}`}>
        {children}
    </div>
  )
}

export default Nav
