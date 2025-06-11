import { useState } from "react";
import Input from "../../components/Input"
import donnee from "../../api/api.json"

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
  author: string;
  image: File | null;
  category: string;
  tags: string[];
  slug?: string;
  statut?: string;
}
const AddCard = () => {
  const [formData, setFormData] = useState<FormDatas>({title: '',
    description: '',
    content: '',
    author: '',
  image: null,
  category: '',
  tags: [],
  slug: '',
  statut: ''
});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Création d'un FormData pour récupérer les données du formulaire
    const formDataSubmit = new FormData(e.currentTarget);
    
    try {
      // Récupération des valeurs
      console.log({
        title: formDataSubmit.get('title'),
        description: formDataSubmit.get('description'),
        image: formDataSubmit.get('image'),
        category: formDataSubmit.get('category'),
        tags: formDataSubmit.getAll('tags') // Utilisation de getAll pour les checkboxes
      });

      // Création d'un nouvel objet card avec tous les champs nécessaires
      const newCard = {
        id: Date.now(),
        title: formDataSubmit.get('title') as string,
        description: formDataSubmit.get('description') as string,
        category: formDataSubmit.get('category') as string,
        tags: formDataSubmit.getAll('tags') as string[],
        image: formData.image ? URL.createObjectURL(formData.image) : "https://picsum.photos/200/300",
        author: "User", // Ajouter l'auteur (à remplacer par l'utilisateur connecté)
        date: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
        comments: [] // Initialiser avec un tableau vide de commentaires
      }
      
      // Ajouter la nouvelle carte au tableau de données
      donnee.push(newCard);
      
      // Dans un environnement réel, vous devriez envoyer ces données à une API
      // Exemple avec fetch:
      // const response = await fetch('/api/cards', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newCard)
      // });
      // if (!response.ok) throw new Error('Failed to save card');
      
      // Réinitialiser le formulaire après soumission réussie
      e.currentTarget.reset();
      setFormData({ title: '', description: '', image: null, category: '', content: '', author:'', tags: []});
      
      // Afficher un message de succès (vous pourriez utiliser une notification)
      alert('Card added successfully!');
    } catch (err) {
      console.error('Error adding card:', err);
      setError(err instanceof Error ? err.message : 'Failed to add card');
    } finally {
      setIsLoading(false);
    }
}

  return (
    <div>
      {/* <h1>Add Card</h1> */}
      <Input fields={field} handleSubmit={handleSubmit} isLoading={isLoading} initialData={formData} loadingText={"Enregistrement"} submitText={"Ajouter"} error={error} className="container mx-auto my-4 p-4 blackBlue rounded-lg"/>
    </div>
  )
}

export default AddCard
