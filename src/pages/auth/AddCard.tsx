import { useState } from "react";
import { usePost } from "../../hooks/usePost";
import { PostProps } from "../../models/PostProps";

interface ImageError {
  image?: string;
}

const AddCard = () => {
  const { handleCreatePosts } = usePost();
  const [formData, setFormData] = useState<Omit<PostProps, 'id' | 'createdAt' | 'updatedAt' | 'comments'>>({
    title: '',
    description: '',
    content: '',
    author: '',
    image: null,
    category: '',
    tags: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ImageError>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      author: '',
      image: null,
      category: '',
      tags: [],
    });
    setImagePreview(null);
    setError(null);
    setErrors({});
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'L\'image ne peut pas dépasser 5MB' }));
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: 'Seuls les fichiers JPEG, PNG et GIF sont autorisés' }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: undefined }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return false;
    }
    if (!formData.image) {
      setError('Image is required');
      return false;
    }
    if (!formData.category) {
      setError('Category is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      // Create FormData and append all fields
      const postData = new FormData();
      postData.append('title', formData.title);
      postData.append('description', formData.description);
      postData.append('content', formData.content);
      postData.append('author', formData.author);
      postData.append('category', formData.category);
      
      if (formData.image) {
        postData.append('image', formData.image);
      }
      
      // Append tags as JSON string or individually
      formData.tags.forEach(tag => postData.append('tags', tag));

      await handleCreatePosts.mutateAsync(postData);
      alert('Card added successfully!');
      resetForm();
    } catch (err) {
      console.error('Error adding card:', err);
      setError((err as Error).message || 'Une erreur est survenue lors de l\'ajout de l\'article');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['Web Development', 'Mobile App', 'Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Networking', 'Database', 'Cloud Computing', 'DevOps', 'UX Design', 'Other'] as const;
  const tags = ['JavaScript', 'React', 'Angular', 'Vue', 'NodeJs', 'Express', 'MongoDB', 'Mysql', 'PostgreSQL', 'Python', 'Django', 'Flask', 'Java', 'Spring', 'C++', 'C#', '.NET', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin', 'TypeScript'] as const;

  return (
    <div className="container mx-auto p-4 md:p-8 bg-warmBeige rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Message d'erreur général */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Title:</span>
          <input
            type="text"
            value={formData.title}
            onChange={e =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-1 block w-3/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </label>

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Description:</span>
          <textarea
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-3/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </label>

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Content:</span>
          <textarea
            rows={10}
            value={formData.content}
            onChange={e =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="mt-1 block w-3/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </label>

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Author:</span>
          <input
            type="text"
            value={formData.author}
            onChange={e =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="mt-1 block w-3/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </label>

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-3/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt={formData.title}
                className="max-w-sm h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm text-center">{errors.image}</p>
          )}
        </label>

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Category:</span>
          <select
            value={formData.category}
            onChange={e =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="mt-1 block w-3/4 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
          >
            <option value="">Select category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-lg font-medium text-shadow-white">Tags:</span>
          {tags.map((tag, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                value={tag}
                checked={formData.tags.includes(tag)}
                onChange={e =>
                  setFormData({
                    ...formData,
                    tags: e.target.checked
                      ? [...formData.tags, tag]
                      : formData.tags.filter(t => t !== tag)
                  })
                }
                className="mr-2"
              />
              <div className="flex gap-20">
                <span className="text-lg">{tag}</span>
                <span className="ml-2 text-sm">
                  {formData.tags.includes(tag) ? (
                    <p className="bg-indigo-400 p-2 m-2 rounded-lg">#{tag}</p>
                  ) : ''}
                </span>
              </div>
            </div>
          ))}
        </label>

        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "En cours..." : "Add Card"}
        </button>
      </form>
    </div>
  );
};

export default AddCard;