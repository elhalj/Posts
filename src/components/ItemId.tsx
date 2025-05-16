
import { BiArrowToLeft } from 'react-icons/bi'
import donnee from '../api/api.json'
import { NavLink, useParams } from 'react-router-dom'

// interface Data {
//   id: number,
//   title: string,
//   description: string,
//   image: string,
//   author: string,
//   date: string,
//   category: string,
//   tags: string[],
//   comments: {
//     id: number,
//     author: string,
//     date: string,
//     content?: string
//   }[]
// }

const ItemId = () => {
  const { id } = useParams<{ id: string }>()
  const data = donnee.find((item) => item.id.toString() === id)

  if (!data) {
    return <div>Item not found</div>
  }

  return (
    <div className="container relative mx-40 p-1 flex flex-col overflow-y-scroll scrollbar [&::-webkit-scrollbar]:hidden items-start justify-around w-1/2 h-[800px] blackBlue">
      <div className="flex flex-col gap-4">
        <button type="button" className="w-1/5 mt-1">
                  <NavLink
                    to={"/"}
                    className="flex items-center justify-center gap-2"
                  >
                    <BiArrowToLeft className="w-6 h-6" />
                    Retour
                  </NavLink>
                </button>
        <div className="flex flex-col gap-2 p-2">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p>{data.description}</p>
          <img src={data.image} alt={data.title} className="w-1/2 h-auto" />
          <p className="text-sm text-gray-500">By {data.author} on {data.date}</p>
          <p className="text-sm text-gray-500">Category: {data.category}</p>
          <div className="flex gap-2">
            {data.tags.map((tag, index) => (
              <span key={index} className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full">#{tag}</span>
            ))}
          </div>
          <div className='flex flex-col gap-2'>
            {data.comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-2 p-2 border-b-2">
                <p className="text-sm text-gray-500">Comment by {comment.author} on {comment.date}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemId

