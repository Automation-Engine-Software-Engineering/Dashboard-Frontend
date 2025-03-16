import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState } from "react";

interface RepeaterProps {
  defaultValues?: {
    title: string;
    university: string;
    country: string;
    city: string;
    degree: number | string;
  }[];
  onValuesChange?: (
    values: {
      title: string;
      university: string;
      country: string;
      city: string;
      degree: number | string;
    }[]
  ) => void;

  lang?: "en" | "fa";
}

const EducationTextfieldRepeater: React.FC<RepeaterProps> = ({
  defaultValues = [
    { city: "", country: "", degree: 0, title: "", university: "" }
  ],
  onValuesChange,
  lang = "fa"
}) => {
  const [rows, setRows] = useState<
    {
      title: string;
      university: string;
      country: string;
      city: string;
      degree: number | string;
    }[]
  >(defaultValues);

  const handleInputChange = (
    index: number,
    field: keyof {
      title: string;
      university: string;
      country: string;
      city: string;
      degree: number | string;
    },
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (onValuesChange) onValuesChange(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        title: "",
        university: "",
        country: "",
        city: "",
        degree: 0
      }
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onValuesChange) onValuesChange(updatedRows);
  };

  return (
    <div dir={lang === "fa" ? "rtl" : "ltr"}>
      {rows.map((row, index) => (
        <div
          key={index}
          className="mb-2 grid grid-cols-1 items-center gap-2 sm:grid-cols-2 lg:flex"
        >
          <button type="button" onClick={() => handleRemoveRow(index)}>
            <MinusCircle size="15" className="text-red-500" />
          </button>
          <input
            type="text"
            value={row.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder={lang === "fa" ? "عنوان" : "Title"}
          />

          <input
            type="text"
            value={row.university}
            onChange={(e) =>
              handleInputChange(index, "university", e.target.value)
            }
            className="w-full rounded border border-gray-300 p-2"
            placeholder={lang === "fa" ? "دانشگاه" : "university"}
          />

          <input
            type="text"
            value={row.country}
            onChange={(e) =>
              handleInputChange(index, "country", e.target.value)
            }
            className="w-full rounded border border-gray-300 p-2"
            placeholder={lang === "fa" ? "کشور" : "Country"}
          />

          <input
            type="text"
            value={row.city}
            onChange={(e) => handleInputChange(index, "city", e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
            placeholder={lang === "fa" ? "شهر" : "City"}
          />

          <select
            value={row.degree}
            onChange={(e) => handleInputChange(index, "degree", e.target.value)}
            className="w-full rounded border border-gray-300 p-2"
          >
            <option value="0">{lang === "fa" ? "کارشناسی" : "bachelor"}</option>
            <option value="1">
              {lang === "fa" ? "کارشناسی ارشد" : "Master's degree"}
            </option>
            <option value="2">{lang === "fa" ? "دکتری" : "Ph.D"}</option>
            <option value="3">
              {lang === "fa" ? "پسادکتری" : "Postdoctoral"}
            </option>
          </select>
        </div>
      ))}
      <button type="button" onClick={handleAddRow}>
        <PlusCircle size="30" className="text-slate-400" />
      </button>
    </div>
  );
};

export default EducationTextfieldRepeater;
