import { useEffect, useState } from "react"
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

interface CardProps {
  data: Data[]
}

const Card = ({ data }: CardProps) => {
  const [items, setItems] = useState<Data[]>([])

  useEffect(() => {
    setItems(data)
  },[data])
  return (
    <div className="container relative mx-auto mb-4 p-1 flex flex-col overflow-y-scroll 
     [&::-webkit-scrollbar]:hidden items-center justify-around rounded-lg w-[1200px]  h-[800px] blackBlue shadow-lg">
      <h1>Posts</h1>
      <div className="grid grid-cols-3  gap-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col justify-center items-center gap-2 p-2 bg-slate-50 border border-gray-500 rounded-lg shadow-md">
            {/* <p>{item.description}</p> */}
            <img src={item.image} alt={item.title} className="w-full h-[150px] rounded-lg" />
            <h2 className="text-xl font-bold text-gray-500">{item.title}</h2>
            <p className="text-sm text-gray-500">By {item.author} on {item.date}</p>
            <p className="text-sm text-gray-500">Category: {item.category}</p>
            <div className="flex gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div><Link to={`/item/${item.id}`} className="text-sm text-gray-600 bg-indigo-100 p-1 rounded-2xl">Lire la suite...</Link></div>
          </div>
        ))}
        </div>
      
    </div>
  )
}

export default Card

