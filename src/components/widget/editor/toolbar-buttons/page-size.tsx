import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

const PageSize: React.FC<
  React.ComponentProps<"div"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  const [size, setSize] = useState<Record<string, string>>(() => {
    if (editorRef.current) {
      return {
        width: editorRef.current.style.width.replace(/px/g, "") ?? "500",
        minHeight: editorRef.current.style.minHeight.replace(/px/g, "") ?? "500"
      };
    }

    return {
      width: "500",
      minHeight: "500"
    };
  });

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.style.width = `${size.width}px`;
      editorRef.current.style.minHeight = `${size.minHeight}px`;
    }
  }, [size]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton className="flex w-fit items-center gap-x-1">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.168 1.66663H5.33464C4.89261 1.66663 4.46868 1.84222 4.15612 2.15478C3.84356 2.46734 3.66797 2.89127 3.66797 3.33329V16.6666C3.66797 17.1087 3.84356 17.5326 4.15612 17.8451C4.46868 18.1577 4.89261 18.3333 5.33464 18.3333H15.3346C15.7767 18.3333 16.2006 18.1577 16.5131 17.8451C16.8257 17.5326 17.0013 17.1087 17.0013 16.6666V7.49996M11.168 1.66663L17.0013 7.49996M11.168 1.66663V7.49996H17.0013"
              stroke="#273646"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Size
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="grid w-64 grid-cols-2 gap-2">
        <Input
          type="number"
          min={0}
          max={1000}
          value={size.width}
          onChange={(e) =>
            setSize((prev) => ({ ...prev, width: e.target.value }))
          }
        />
        <Input
          type="number"
          min={0}
          max={1000}
          value={size.minHeight}
          onChange={(e) =>
            setSize((prev) => ({ ...prev, minHeight: e.target.value }))
          }
        />
      </PopoverContent>
    </Popover>
  );
};
export default PageSize;
