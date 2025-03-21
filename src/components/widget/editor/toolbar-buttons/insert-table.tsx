import { ChevronDownIcon, TableIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

const InsertTable: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef, className }) => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);

  const createTable = () => {
    if (!editorRef.current) return;

    if (rows < 1 || cols < 1) return;

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.height = "100%";
    table.style.border = "1px solid black";

    for (let i = 0; i < rows; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        cell.style.border = "1px solid black";
        cell.style.padding = "8px";
        cell.contentEditable = "true";
        cell.textContent = `Row ${i + 1} Col ${j + 1}`;
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    editorRef.current.appendChild(table);

    setRows(3);
    setCols(3);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          className={cn(
            "flex size-fit items-center gap-x-2 font-sans",
            className
          )}
        >
          <TableIcon />
          Table
          <ChevronDownIcon />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="grid w-48 grid-cols-2 gap-3">
        <Input
          type="number"
          placeholder="Row"
          onChange={(e) => setRows(+e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Col"
          onChange={(e) => setCols(+e.target.value)}
          required
        />
        <Button className="col-span-full" onClick={createTable}>
          Insert
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default InsertTable;
