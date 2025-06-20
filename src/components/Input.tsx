import { useState, ReactNode, ChangeEvent, useEffect } from "react";

type FormValue = string | boolean | File | null | undefined | string[];
export type FormData = Record<string, FormValue>;

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
  loadingText?: string;
  submitText?: string;
  error?: string | null;
  className?: string;
  children?: ReactNode;
  value: FormData;
  onChange: (name: string, value: FormValue) => void;
}

const Input = ({
  fields,
  handleSubmit,
  isLoading,
  loadingText,
  submitText,
  error,
  className,
  children,
  value,
  onChange,
}: InputProps) => {
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>({});
  useEffect(() => {
    // Réinitialiser les prévisualisations quand value change
    if (!value.image) {
      setImagePreviews(prev => ({ ...prev, image: '' }));
    }
  }, [value]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;

    if (type === "checkbox") {
      const checkboxValue = (e.target as HTMLInputElement).value;
      const previousValue = (value[name] as string[]) || [];
      let newValue;

      if ((e.target as HTMLInputElement).checked) {
        newValue = [...previousValue, checkboxValue];
      } else {
        newValue = previousValue.filter((v) => v !== checkboxValue);
      }
      
      onChange(name, newValue);
    }
    else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      onChange(name, file);

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviews(prev => ({
            ...prev,
            [name]: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreviews(prev => ({ ...prev, [name]: '' }));
      }
    }
    else {
      const { value: inputValue } = e.target;
      onChange(name, inputValue);
    }
  }

  const renderInputFields = (field: Field) => {
    const currentValue = value[field.name];

    switch (field.type) {
      case "text":
      case "password":
      case "email":
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={typeof currentValue === "string" ? currentValue : ""}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border rounded p-2 bg-slate-200 text-black"
          />
        );
      case "textarea":
        return (
          <textarea
            key={field.name}
            name={field.name}
            value={typeof currentValue === "string" ? currentValue : ""}
            placeholder={field.placeholder}
            onChange={handleChange}
            className="border rounded p-2 bg-slate-200 text-black w-full min-h-[100px]"
          />
        );
      case "select":
        return (
          <select
            key={field.name}
            name={field.name}
            value={typeof currentValue === "string" ? currentValue : ""}
            onChange={handleChange}
            className="border rounded p-2 bg-slate-200 text-black w-full"
            aria-label={field.label}
          >
            <option value="">Sélectionnez une option</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div className="flex gap-2 flex-wrap border border-gray-300 rounded p-2 bg-slate-200 text-black w-full">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  onChange={handleChange}
                  checked={
                    Array.isArray(currentValue) &&
                    currentValue.includes(option.value)
                  }
                  className="form-checkbox h-4 w-4"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );
        case "file": {
          const preview = imagePreviews[field.name];
          return (
            <div className="flex flex-col justify-center items-center gap-2">
              <input
                key={field.name}
                type="file"
                name={field.name}
                onChange={handleChange}
                className="border rounded p-2 bg-slate-200 text-black w-full"
                title={field.label}
                placeholder={field.placeholder || "Choose a file"}
                aria-label={field.label}
              />
              {preview && (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-28 h-auto mt-2 border rounded"
                />
              )}
            </div>
          );
        }
      default:
        return null;
    }
  };

  const renderError = (error: string | null) => {
    if (!error) return null;
    return (
      <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  };

  const renderSubmitButton = (isLoading: boolean, loadingText?: string, submitText?: string) => {
    return (
      <button 
        type="submit" 
        disabled={isLoading}
        className={`px-4 py-2 rounded ${
          isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-700'
        } text-white font-bold`}
      >
        {isLoading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            {loadingText || 'Processing...'}
          </div>
        ) : (
          submitText || 'Submit'
        )}
      </button>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 justify-center items-center ${className}`}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        {fields.map((field) => (
          <div
            key={field.name}
            className="flex flex-col gap-2 justify-center items-center"
          >
            <label className="flex flex-col gap-2 justify-center items-center">
              <p className="font-bold uppercase">{field.label}</p>
              {renderInputFields(field)}
            </label>
          </div>
        ))}
      </div>

      {error && renderError(error)}

      {renderSubmitButton(isLoading, loadingText, submitText)}

      {children}
    </form>
  );
};

export default Input;
