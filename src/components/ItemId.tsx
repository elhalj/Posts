import { BiArrowToLeft } from 'react-icons/bi'
import { NavLink, useParams } from 'react-router-dom'
import { PostProps } from '../models/PostProps'
import usePostStore from '../store/postStore'
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react'

const ItemId = () => {
  const { id } = useParams<{ id: string }>()
  const { posts} = usePostStore()
  const { handleGetPosts } = usePost()
  
  // S'assurer que les posts sont chargés
  useEffect(() => {
    if (posts.length === 0 && !handleGetPosts.isLoading) {
      handleGetPosts.refetch();
    }
  }, [posts.length, handleGetPosts]);

  const data = posts.find((item) => item.id.toString() === id) as PostProps | undefined

  if (handleGetPosts.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (handleGetPosts.isError) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Erreur de chargement</h2>
          <p className="text-red-500 mb-4">
            {handleGetPosts.error?.message || "Une erreur s'est produite lors du chargement des articles"}
          </p>
          <NavLink
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Retour à l'accueil
          </NavLink>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article non trouvé</h2>
          <p className="text-gray-600 mb-4">L'article demandé n'existe pas ou a été supprimé.</p>
          <NavLink
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Retour à l'accueil
          </NavLink>
        </div>
      </div>
    );
  }

  const formattedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleString()
    : "Date inconnue";
  
  const defaultImage = '/path/to/default-image.jpg'; // Remplacez par le chemin de votre image par défaut
  
  const getImageSrc = (image: string | File | null): string => {
    if (typeof image === 'string') return image;
    if (image instanceof File) return URL.createObjectURL(image);
    return defaultImage;
  };

  const getAuthorName = (author: string | { name: string }): string => {
    if (typeof author === 'object' && author.name) {
      return author.name;
    }
    return typeof author === 'string' ? author : 'Auteur inconnu';
  };

  return (
    <div className="container relative mx-40 p-1 flex flex-col overflow-y-scroll scrollbar [&::-webkit-scrollbar]:hidden items-start justify-around w-1/2 h-[800px] blackBlue">
      <div className="flex flex-col gap-4 w-full">
        <button type="button" className="w-1/5 mt-1">
          <NavLink
            to="/"
            className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <BiArrowToLeft className="w-6 h-6" />
            Retour
          </NavLink>
        </button>
        
        <div className="flex flex-col gap-2 p-2">
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <span>Par {getAuthorName(data.author)}</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>{formattedDate}</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="bg-gray-100 px-2 py-1 rounded">{data.category}</span>
          </div>
          
          <img 
            src={getImageSrc(data.image)} 
            alt={data.title} 
            className="w-full h-auto max-h-96 object-cover rounded-lg mb-4"
            onError={(e) => {
              e.currentTarget.src = defaultImage;
            }}
          />
          
          <div className="prose max-w-none mb-6">
            <p className="text-lg leading-relaxed">{data.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {data.tags && data.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {data.comments && data.comments.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Commentaires ({data.comments.length})</h3>
              <div className='flex flex-col gap-4'>
                {data.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-800">{comment.author}</span>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemId