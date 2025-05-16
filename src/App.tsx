import { Route, Routes } from "react-router-dom"
import _Layout from "./components/layouts/MainLayout/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Page from "./pages/Page"
import Page2 from "./pages/Page2"
import Page3 from "./pages/Page3"
import ItemId from "./components/ItemId"
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout"
import Dashboard from "./pages/auth/Dashboard"
import AddCard from "./pages/auth/AddCard"
import ModifyCard from "./pages/auth/ModifyCard"
import ReadItems from "./pages/auth/components/ReadItems"

const App = () => {
  const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold">Veuillez vous connecter sur un ordinateur</h1>
        <p className="text-xl">Ce site web n'est pas encore compatible avec les telephones</p>
      </div>
    )
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<_Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="1" element={<Page />} />
          <Route path="2" element={<Page2 />} />
          <Route path="3" element={<Page3 />} />
          <Route path="item/:id" element={<ItemId />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
        <Route path="/dashboard" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddCard />} />
          <Route path="item/:id/edit" element={<ModifyCard />} />
          <Route path="posts/:id" element={<ReadItems />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

