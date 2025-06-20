import { useState } from "react";
import Input from "../../components/Input"
// import donnee from "../../services/api/api.json"
import { usePost } from "../../hooks/usePost";
import { PostProps } from "../../models/PostProps";

const field = [
  {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Enter the title",
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    placeholder: "Enter the decription",
  },
  {
    label: "Content",
    type: "textarea",
    name: "content",
    placeholder: "Enter the content",
  },
  {
    label: "Author",
    type: "text",
    name: "author",
    placeholder: "le nom de l'auteur",
  },
  {
    label: "Image",
    type: "file",
    name: "image",
    placeholder: "Upload an image",
  },
  {
    label: "Category",
    type: "select",
    name: "category",
    placeholder: "Select a category",
    options: [
      { label: "Sante", value: "Santé" },
      { label: "Education", value: "Éducation" },
      { label: "Finance", value: "Finance" },
      { label: "Sport", value: "Sport" },
      { label: "Culture", value: "Culture" },
      { label: "Technologie", value: "Technologie" },
      { label: "Voyage", value: "Voyage" },
      { label: "Politique", value: "Politique" },
    ]
  },
  {
    label: "Tags",
    type: "checkbox",
    name: "tags",
    placeholder: "Select tags",
    options: [
      { label: "Sante", value: "sante" },
      { label: "Education", value: "education" },
      { label: "Finance", value: "finance" },
      { label: "Sport", value: "sport" },
      { label: "Culture", value: "culture" },
      { label: "Politique", value: "politique" },
    ]
  }
]

// type FormDatas = {
//   title: string;
//   description: string;
//   content: string;
//   image: string | File | null;
//   author: string;
//   category: string;
//   tags: string[];
// }
interface FieldError {
  [key: string]: string;
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

  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

const validateField = (name: string, value: string | boolean | File | null | undefined | string[]) => {
  switch(name) {
    case 'title':
      return !value ? 'Title is required' : '';
    case 'description':
      return !value ? 'Description is required' : '';
    case 'content':
      return !value ? 'Content is required' : '';
    case 'category':
      return !value ? 'Category is required' : '';
    default:
      return '';
  }
};
  
  const handleFieldChange = (name: string, value: string | boolean | File | null | undefined | string[]) => {
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
    const error = validateField(name, value);
  setFieldErrors(prev => ({
    ...prev,
    [name]: error
  }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    
  try {
    // Add validation before submission
    if (!formData.title.trim()) {
      throw new Error('Title is required');
    }
    if (!formData.description.trim()) {
      throw new Error('Description is required');
    }
    if (!formData.content.trim()) {
      throw new Error('Content is required');
    }
    if (!formData.image) {
      throw new Error('Image is required');
    }
    if (!formData.category) {
      throw new Error('Category is required');
    }
    
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
      // setImagePreviews({});
    };

    await handleCreatePosts.mutateAsync({...formData, image: formData.image instanceof File ? formData.image : null});
    alert('Card added successfully!');
    resetForm();
  } catch (err) {
    console.error('Error adding card:', err);
    setError((err as Error).message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div>
      {/* <h1>Add Card</h1> */}
      <Input fields={field} handleSubmit={handleSubmit} isLoading={isLoading} loadingText={"Enregistrement"} submitText={"Ajouter"} error={error} className="container mx-auto my-4 p-4 blackBlue rounded-lg" value={formData} onChange={handleFieldChange} />
    </div>
  )
}

export default AddCard
