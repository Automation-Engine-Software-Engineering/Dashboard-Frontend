import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";

interface RepeaterInputsProps {
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
}

const TextfieldRepeater: React.FC<RepeaterInputsProps> = ({
  defaultValues = [],
  onValuesChange
}) => {
  const [inputs, setInputs] = useState<string[]>(defaultValues);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(inputs);
    }
  }, [inputs]);

  const handleAddInput = () => {
    setInputs((prev) => [...prev, ""]);
  };

  const handleRemoveInput = (index: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  return (
    <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-3">
      {inputs.map((value, index) => (
        <div key={index} className="flex items-center gap-x-2">
          <button type="button" onClick={() => handleRemoveInput(index)}>
            <MinusCircle size="15" className="text-red-500" />
          </button>
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={``}
          />
        </div>
      ))}
      <button type="button" onClick={handleAddInput}>
        <PlusCircle size="30" className="text-slate-400" />
      </button>
    </div>
  );
};

export default TextfieldRepeater;
