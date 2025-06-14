// import donnee from '../services/api/api.json'
import { Link } from "react-router-dom";
// import { PostProps } from "../models/PostProps"
import { usePost } from "../hooks/usePost";
import usePostStore from "../store/postStore";
// import usePostStore from "../store/postStore"

const Home = () => {
  const { posts } = usePostStore();
  const { handleGetPosts } = usePost();

  // Handle loading and error states
  if (handleGetPosts.isLoading) {
    return <div>Loading posts...</div>;
  }

  if (handleGetPosts.isError) {
    return <div>Error loading posts: {handleGetPosts.error?.message}</div>;
  }

  return (
    <div
      className="container relative mx-28 p-1 flex flex-col overflow-y-scroll 
      [&::-webkit-scrollbar]:hidden items-center justify-around rounded-lg w-[1200px]  h-[800px] blackBlue shadow-lg"
    >
      <h1>Home</h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((item) => (
          <div
            key={item._id}
            className="flex flex-col items-center gap-2 p-2 bg-slate-50 border border-gray-800 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 rounded-sm"
            />
            <h2 className="text-xl font-bold">{item.title}</h2>
            {/* <p>{item.description}</p> */}
            <p className="text-sm text-gray-500">
              By {item.author.name} on{" "}
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Category: {item.category}</p>
            <div className="flex gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div>
              <Link to={`/item/${item._id}`} className="text-gray-500">
                Lire la suite
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
