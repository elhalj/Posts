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
    <div className="container mx-auto mb-4 p-1 flex flex-col overflow-y-scroll bg-slate-50 border border-gray-500 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold">Posts</h1>
      <div className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col justify-center items-start gap-2 p-4 rounded-lg shadow-md bg-white">
            <img src={item.image} alt={item.title} className="w-full h-[150px] rounded-t-lg" />
            <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-gray-600">By {item.author} on {item.date}</p>
            <p className="text-sm text-gray-600">Category: {item.category}</p>
            <div className="flex gap-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <Link to={`/dashboard/posts/${item.id}`}>Lire la suite...</Link>
              </button>
              <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">
                <Link to={`/dashboard/item/${item.id}/edit`}>Modifier</Link>
              </button>
              <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setItems(items.filter((i) => i.id !== item.id))}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card

