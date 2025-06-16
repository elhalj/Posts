import { useState } from "react";
import Input from "../../components/Input"
// import donnee from "../../services/api/api.json"
import { usePost } from "../../hooks/usePost";

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

type FormDatas = {
  title: string;
  description: string;
  content: string;
  image: string | File | null;
  author: string;
  category: string;
  tags: string[];
}
const AddCard = () => {
  const { handleCreatePosts } = usePost();
  const [formData, setFormData] = useState<FormDatas>({
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

  const handleFieldChange = (name: string, value: string | boolean | File | null | undefined | string[]) => {
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === "image" && value === null) {
        newData.image = null
      }
      return newData;
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!formData.image) {
        throw new Error('Image is required');
      }
      handleCreatePosts.mutateAsync({...formData, image: formData.image})
      setFormData({
        title: '',
        description: '',
        content: '',
        image: null,
        author: '',
        category: '',
        tags: [],
      });
      
      alert('Card added successfully!');
    } catch (err) {
      console.error('Error adding card:', err);
      setError(err instanceof Error ? err.message : 'Failed to add card');
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
