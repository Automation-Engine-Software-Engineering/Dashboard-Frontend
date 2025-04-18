import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";

interface RepeaterProps {
  defaultValues?: {
    title: string;
    titleFa: string;
    link: string;
  }[];
  onValuesChange?: (
    values: { title: string; titleFa: string; link: string }[]
  ) => void;
}

const WebLinkTextfieldRepeater: React.FC<RepeaterProps> = ({
  defaultValues = [],
  onValuesChange
}) => {
  const [rows, setRows] =
    useState<{ title: string; titleFa: string; link: string }[]>(defaultValues);

  const handleInputChange = (
    index: number,
    field: keyof { title: string; titleFa: string; link: string },
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
        titleFa: "",
        link: ""
      }
    ]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onValuesChange) onValuesChange(updatedRows);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <div
          key={index}
          className="mb-2 grid grid-cols-1 items-center gap-2 sm:flex"
        >
          <button type="button" onClick={() => handleRemoveRow(index)}>
            <MinusCircle size="15" className="text-red-500" />
          </button>
          <Input
            type="text"
            value={row.titleFa}
            onChange={(e) =>
              handleInputChange(index, "titleFa", e.target.value)
            }
            placeholder="عنوان"
          />

          <Input
            type="text"
            value={row.link}
            onChange={(e) => handleInputChange(index, "link", e.target.value)}
            placeholder="لینک"
          />

          <Input
            type="text"
            value={row.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
            placeholder="Title"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddRow}>
        <PlusCircle size="30" className="text-slate-400" />
      </button>
    </div>
  );
};

export default WebLinkTextfieldRepeater;
