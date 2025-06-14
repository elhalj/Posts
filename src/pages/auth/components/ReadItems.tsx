import { NavLink, useParams } from "react-router-dom";
import { BiArrowToLeft } from "react-icons/bi";
import usePostStore from "../../../store/postStore";

const ReadItems = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = usePostStore();
  const data = posts.find((item) => item._id.toString() === id);

  if (!data) {
    return <div>Item not found</div>;
  }

  return (
    <div className="container relative mx-auto my-6 p-1 flex flex-col overflow-y-scroll scrollbar [&::-webkit-scrollbar]:hidden items-start justify-around w-1/2 h-[800px] blackBlue">
      <div className="flex flex-col gap-4">
        <button type="button" className="w-1/5 mt-1">
          <NavLink
            to={"/dashboard"}
            className="flex items-center justify-center gap-2"
          >
            <BiArrowToLeft className="w-6 h-6" />
            Retour
          </NavLink>
        </button>
        <div className="flex flex-col justify-center items-start gap-2 p-2 ">
          <div className="w-full p-2 bg-slate-50 border border-gray-500 rounded-lg shadow-md">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-[600px] rounded-lg"
            />
          </div>

          <h2 className="text-xl font-bold">{data.title}</h2>
          <p>{data.description}</p>
          <p>{data.content}</p>
          <p className="text-sm text-gray-500">
            By {data.author.name} on {data.createdAt}
          </p>
          <p className="text-sm text-gray-500">Category: {data.category}</p>
          <div className="flex gap-2">
            {data.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadItems;

