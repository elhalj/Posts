import { useState, ReactNode, ChangeEvent } from "react";

type FormValue = string | boolean | File | null | undefined;
type FormData = Record<string, FormValue>;

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  options?: { label: string; value: string }[];
}

interface InputProps {
  fields: Field[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  initialData: FormData;
  loadingText?: string;
  submitText?: string;
  error?: string | null;
  children?: ReactNode;
}

const Input = ({
  fields,
  handleSubmit,
  isLoading,
  initialData,
  loadingText,
  submitText,
  error,
  children
}: InputProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    
    let value: FormValue;
    if (type === 'checkbox') {
      value = (e.target as HTMLInputElement).checked;
    } else if (type === 'file') {
      value = (e.target as HTMLInputElement).files?.[0] || null;
    } else {
      value = e.target.value;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderInputFields = (field: Field) => {
    const currentValue = formData[field.name];
    
    switch (field.type) {
      case 'text':
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={typeof currentValue === 'string' ? currentValue : ''}
            placeholder={field.placeholder}
            onChange={handleChange}
            autoComplete="on"
            className="border rounded p-2 bg-slate-200 text-black"
          />
        );
      case 'password':
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={typeof currentValue === 'string' ? currentValue : ''}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border rounded p-2 bg-slate-200 text-black"
          />
        );
      case 'email':
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={typeof currentValue === 'string' ? currentValue : ''}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border rounded p-2 bg-slate-200 text-black"
          />
        );
      
      // case 'select':
      //   return (
      //     <select
      //       key={field.name}
      //       name={field.name}
      //       value={typeof currentValue === 'string' ? currentValue : ''}
      //       onChange={handleChange}
      //     >
      //       {field.options?.map(option => (
      //         <option key={option.value} value={option.value}>
      //           {option.label}
      //         </option>
      //       ))}
      //     </select>
      //   );

      case 'textarea':
        return (
          <textarea
            key={field.name}
            name={field.name}
            value={typeof currentValue === 'string' ? currentValue : ''}
            placeholder={field.placeholder}
            onChange={handleChange}
          />
        );

      // case 'checkbox':
      //   return (
      //     <input
      //       key={field.name}
      //       type="checkbox"
      //       name={field.name}
      //       checked={typeof currentValue === 'boolean' ? currentValue : false}
      //       onChange={handleChange}
      //     />
      //   );

      // case 'file':
      //   return (
      //     <input
      //       key={field.name}
      //       type="file"
      //       name={field.name}
      //       onChange={handleChange}
      //     />
      //   );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="flex flex-col gap-4 justify-center items-center">
        {fields.map(field => (
          <div key={field.name} className="flex flex-col gap-2 justify-center items-center">
            <label className="flex flex-col gap-2 justify-center items-center">{field.label}
              {renderInputFields(field)}
              </label>
          </div>
        ))}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <button 
        type="submit" 
        disabled={isLoading}
        className="m-2"
      >
        {isLoading ? (loadingText || "Processing...") : (submitText || "Submit")}
      </button>
      
      {children}
    </form>
  );
};

export default Input;