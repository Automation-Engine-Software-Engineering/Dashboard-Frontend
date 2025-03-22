import { ChevronDown, Columns3Icon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

interface InsertColumnsProps {
  editorRef: React.RefObject<HTMLDivElement>;
}

const InsertColumns: React.FC<InsertColumnsProps> = ({ editorRef }) => {
  const [columns, setColumns] = useState<number>(2);

  const insertColumns = (colCount: number) => {
    if (!editorRef.current) return;

    const container = document.createElement("div");
    container.setAttribute("data-columns", "container");

    Object.assign(container.style, {
      maxWidth: "100%",
      display: "grid",
      gap: "16px",
      gridTemplateColumns: `repeat(${colCount}, 1fr)`,
      marginBottom: "16px",
      borderCollapse: "collapse"
    });

    for (let i = 0; i < colCount; i++) {
      const column = document.createElement("div");
      column.setAttribute("data-columns", "column");

      column.contentEditable = "true";
      Object.assign(column.style, {
        minHeight: "50px",
        outline: "none"
      });
      column.innerHTML = "<div><br/></div>";

      container.appendChild(column);
    }

    const spacer = document.createElement("div");
    spacer.contentEditable = "true";
    spacer.innerHTML = "<br>";

    editorRef.current.appendChild(container);
    editorRef.current.appendChild(spacer);

    setColumns(2);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton className="flex size-fit items-center gap-x-1">
          <Columns3Icon />
          Columns
          <ChevronDown />
        </ToolbarButton>
      </PopoverTrigger>

      <PopoverContent dir="ltr" className="flex w-fit items-center gap-x-1">
        <Input
          type="number"
          placeholder="Col"
          value={columns}
          className="w-32"
          onChange={(e) =>
            setColumns(Math.min(Math.max(Number(e.target.value), 2), 12))
          }
          min={2}
          max={12}
        />
        <Button className="flex-1" onClick={() => insertColumns(columns)}>
          Insert
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default InsertColumns;
