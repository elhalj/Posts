import { NavLink, useParams } from "react-router-dom";
import donnee from '../../services/api/api.json';
import { BiArrowToLeft } from "react-icons/bi";
import { useState } from "react";


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

  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (name: string, value: string | boolean | File | null | undefined | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <label htmlFor="title" className="text-lg">
            Titre
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="p-2 border-2 rounded-lg"
          />
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={(e) => handleFieldChange('description', e.target.value)}
            className="p-2 border-2 rounded-lg"
          />
          <label htmlFor="image" className="text-lg">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e) => handleFieldChange('image', e.target.files?.[0])}
            className="p-2 border-2 rounded-lg"
          />
          {formData.image_preview && (
            <img
              src={formData.image_preview}
              alt="Preview de l'image"
              className="w-full h-auto my-2"
            />
          )}
          <label htmlFor="category" className="text-lg">
            Catégorie
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            className="p-2 border-2 rounded-lg"
          >
            <option value="">Sélectionnez une catégorie</option>
            <option value="Santé">Santé</option>
            <option value="Éducation">Éducation</option>
            <option value="Finance">Finance</option>
            <option value="Sport">Sport</option>
            <option value="Culture">Culture</option>
            <option value="Technologie">Technologie</option>
            <option value="Voyage">Voyage</option>
            <option value="Politique">Politique</option>
          </select>
          <label htmlFor="tags" className="text-lg">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={formData.tags.join(', ')}
            onChange={(e) => handleFieldChange('tags', e.target.value.split(', '))}
            className="p-2 border-2 rounded-lg"
          />
          <label htmlFor="author" className="text-lg">
            Auteur
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={(e) => handleFieldChange('author', e.target.value)}
            className="p-2 border-2 rounded-lg"
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Enregistrer les modifications
          </button>
       </form>
         
      </div>
    </div>
  );
};

export default ModifyCard;

