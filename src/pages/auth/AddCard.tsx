import { useState } from "react";
import Input from "../../components/Input"

const field = [
  {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Enter the title",
  },
  {
    label: "Description",
    type: "textarea",
    name: "description",
    placeholder: "Enter the decription",
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
      { label: "Sante", value: "sante" },
      { label: "Education", value: "education" },
      { label: "Finance", value: "finance" },
      { label: "Sport", value: "sport" },
      { label: "Culture", value: "culture" },
      { label: "Politique", value: "politique" },
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
  image: File | null;
  category: string;
  tags: string[];
}
const AddCard = () => {
  const [formData, setFormData] = useState<FormDatas>({title: '',
  description: '',
  image: null,
  category: '',
  tags: []});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Création d'un FormData pour récupérer les données du formulaire
    const formDataSubmit = new FormData(e.currentTarget);
    
    // Récupération des valeurs
    console.log({
      title: formDataSubmit.get('title'),
      description: formDataSubmit.get('description'),
      image: formDataSubmit.get('image'),
      category: formDataSubmit.get('category'),
      tags: formDataSubmit.getAll('tags') // Utilisation de getAll pour les checkboxes
    });
}

  return (
    <div>
      {/* <h1>Add Card</h1> */}
      <Input fields={field} handleSubmit={ handleSubmit} isLoading={false} initialData={formData} loadingText={"Enregistrement"} submitText={"Ajouter"} error={null} className="container mx-auto my-4 p-4 blackBlue rounded-lg"/>
    </div>
  )
}

export default AddCard
