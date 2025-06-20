import { Link } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import usePostStore from "../store/postStore";
import error from "../assets/error.jpg"

const Home = () => {
  const { posts } = usePostStore();
  const { handleGetPosts } = usePost();

  if (handleGetPosts.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (handleGetPosts.isError) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading posts: {handleGetPosts.error?.message}
      </div>
    );
  }
  const defaultImage = error; // Ajoutez votre chemin d'image par défaut

  const getImageSrc = (image: string | File | null): string => {
    if (typeof image === 'string') return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return defaultImage;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Latest Articles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative">{""}
              <img
                src={getImageSrc(item.image)}
                alt={item.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.src = defaultImage;
                }}
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white/80 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-800 line-clamp-2">
                {item.title}
              </h2>
              
              <div className="flex items-center gap-2 mb-4">
  <div className="text-sm text-gray-600">
    By {typeof item.author === 'object' ? item.author.name : item.author}
  </div>
  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
</div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    #{tag }
                  </span>
                ))}
              </div>

              <Link
                to={`/item/${item.id}`}
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

