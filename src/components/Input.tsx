import { useState, ReactNode, ChangeEvent } from "react";

type FormValue = string | boolean | File | null | undefined | string[];
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
  className?: string;
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
  className,
  children,
}: InputProps) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const checkboxValue = (e.target as HTMLInputElement).value;
      const previousValue = (formData[name] as string[]) || [];

      if ((e.target as HTMLInputElement).checked) {
        setFormData((prev) => ({
          ...prev,
          [name]: [...previousValue, checkboxValue],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: previousValue.filter((v) => v !== checkboxValue),
        }));
      }
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [name + "_preview"]: reader.result as string,
        }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const renderInputFields = (field: Field) => {
    const currentValue = formData[field.name];

    switch (field.type) {
      case "text":
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={typeof currentValue === "string" ? currentValue : ""}
            placeholder={field.placeholder}
            onChange={handleChange}
            autoComplete="on"
            className="border rounded p-2 bg-slate-200 text-black"
          />
        );
      case "password":
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
      // return (
      //   <div className="flex gap-2 flex-wrap">
      //     {field.options?.map((option) => (
      //       <label key={option.value} className="flex items-center gap-1">
      //         <input
      //           type="checkbox"
      //           name={field.name}
      //           value={option.value}
      //           onChange={handleChange}
      //           checked={
      //             Array.isArray(currentValue) &&
      //             currentValue.includes(option.value)
      //           }
      //         />
      //         {option.label}
      //       </label>
      //     ))}
      //   </div>
      // );

      case "file": {
        const preview = formData[field.name + "_preview"];
        return (
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              key={field.name}
              type="file"
              name={field.name}
              onChange={handleChange}
              title={field.label}
              placeholder={field.placeholder || "Choose a file"}
              className="border rounded p-2 bg-slate-200 text-black w-full"
            />
            {typeof preview === "string" && (
              <img src={preview} alt={field.label} className="w-28 h-auto" />
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 justify-center items-center ${className}`}>
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

      {error && <div className="error-message">{error}</div>}

      <button type="submit" disabled={isLoading} className="m-2">
        {isLoading ? loadingText || "Processing..." : submitText || "Submit"}
      </button>

      {children}
    </form>
  );
};

export default Input;
