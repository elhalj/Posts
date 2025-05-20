import { NavLink, useParams } from "react-router-dom";
import donnee from '../../api/api.json';
import Input from "../../components/Input";
import { BiArrowToLeft } from "react-icons/bi";

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
    placeholder: "Enter the description",
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
];



// interface CardData {
//   id?: number;
//   title: string;
//   description: string;
//   image: string | null;
//   image_preview?: string;
//   category: string;
//   tags: string[];
//   author: string;
//   date: string;
//   comments?: any[];
// }



const ModifyCard = () => {
  const { id } = useParams<{ id: string }>();
  const data = donnee.find((item) => item.id.toString() === id);

  // Convertir les données initiales au format attendu par le composant Input
  const initialFormData = {
    title: data?.title || "",
    description: data?.description || "",
    image: null, // On ne peut pas initialiser directement un File
    image_preview: data?.image || "", // Ajout du preview de l'image existante
    category: data?.category || "",
    tags: data?.tags || [],
    author: data?.author || "",
    date: data?.date || ""
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formDataSubmit = new FormData(e.currentTarget);
    
    const updatedData = {
      id: data?.id ?? Date.now(),
      title: formDataSubmit.get('title') as string,
      description: formDataSubmit.get('description') as string,
      category: formDataSubmit.get('category') as string,
      tags: formDataSubmit.getAll('tags') as string[],
      image: data?.image || "", // Keep as string, since File is not supported in donnee
      author: data?.author || "Unknown",
      date: data?.date || new Date().toISOString(),
      comments: data?.comments || []
    };

    donnee.push(updatedData);
    console.log(updatedData);
    // Ici vous pouvez ajouter votre logique pour sauvegarder les modifications
  };

  return (
    <div className="container relative mx-auto my-6 p-1 flex flex-col overflow-y-scroll scrollbar [&::-webkit-scrollbar]:hidden items-start justify-around w-1/2 h-[800px] blackBlue">
        <button type="button" className="w-1/5 mt-1">
          <NavLink
            to={"/dashboard"}
            className="flex items-center justify-center gap-2"
          >
            <BiArrowToLeft className="w-6 h-6" />
            Retour
          </NavLink>
      </button>
      <div className="flex flex-col items-center w-full">
         <Input 
          fields={field} 
          handleSubmit={handleSubmit} 
          isLoading={false} 
          initialData={initialFormData}
          submitText={data ? "Modifier" : "Ajouter"}
          loadingText="Modification en cours..."
        />
      </div>
    </div>
  );
};

export default ModifyCard;

