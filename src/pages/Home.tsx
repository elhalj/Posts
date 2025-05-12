import { useEffect, useState } from "react"
import donnee from '../api/api.json'
import { Link } from "react-router-dom"

interface Data {
  id: number,
  title: string,
  description: string,
  image: string,
  author: string,
  date: string,
  category: string,
  tags: string[],
  comments: {
    id: number,
    author: string,
    date: string,
    content?: string
  }[]
}

const Home = () => {
  const [data, setData] = useState<Data[]>([])

  // useEffect(() => {
  //   const handleScroll = (event: WheelEvent) => {
  //     event.preventDefault()
  //     const scrollAmount = event.deltaY
  //     window.scrollBy({
  //       top: scrollAmount,
  //       behavior: 'smooth'
  //     })
  //   }

  //   window.addEventListener('wheel', handleScroll, { passive: false })

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll)
  //   }
  // }, [])
  useEffect(() => {
    setData(donnee)
  }, [])
  console.log(data)
  return (
    <div className="container relative mx-28 p-1 flex flex-col overflow-y-scroll 
     [&::-webkit-scrollbar]:hidden items-start justify-around rounded-lg w-[1200px]  h-[800px] blackBlue shadow-lg">
      <h1>Home</h1>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col gap-2 p-2 border-b-2">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.description}</p>
            <img src={item.image} alt={item.title} className="w-1/2 h-auto" />
            <p className="text-sm text-gray-500">By {item.author} on {item.date}</p>
            <p className="text-sm text-gray-500">Category: {item.category}</p>
            <div className="flex gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div><Link to={`/item/${item.id}`}>Lire la suite</Link></div>
          </div>
        ))}
        </div>
      
    </div>
  )
}

export default Home

