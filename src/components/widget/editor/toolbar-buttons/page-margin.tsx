import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

const PageMargin: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  const [margin, setMargin] = useState<Record<string, string>>({
    top: "8",
    right: "8",
    left: "8",
    bottom: "8"
  });

  useEffect(() => {
    if (editorRef.current) {
      setMargin({
        top: editorRef.current.style.paddingTop.replace(/px/g, ""),
        right: editorRef.current.style.paddingRight.replace(/px/g, ""),
        left: editorRef.current.style.paddingLeft.replace(/px/g, ""),
        bottom: editorRef.current.style.paddingBottom.replace(/px/g, "")
      });
    }
  }, []);

  useEffect(() => {
    console.log(margin);
    if (editorRef.current) {
      editorRef.current.style.paddingTop = `${margin.top}px`;
      editorRef.current.style.paddingRight = `${margin.right}px`;
      editorRef.current.style.paddingLeft = `${margin.left}px`;
      editorRef.current.style.paddingBottom = `${margin.bottom}px`;
    }
  }, [margin]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton className="flex w-fit items-center gap-x-1">
          <svg
            width="18"
            height="26"
            viewBox="0 0 18 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="16.3333"
              height="25"
              fill="white"
              stroke="#273646"
            />
            <line
              x1="3.96875"
              y1="0.866699"
              x2="3.96875"
              y2="25.1334"
              stroke="#93C8F5"
            />
            <line
              x1="13.5"
              y1="0.866699"
              x2="13.5"
              y2="25.1334"
              stroke="#93C8F5"
            />
            <line
              x1="0.867188"
              y1="3.8335"
              x2="16.4672"
              y2="3.8335"
              stroke="#93C8F5"
            />
            <line
              x1="0.867188"
              y1="22.0332"
              x2="16.4672"
              y2="22.0332"
              stroke="#93C8F5"
            />
          </svg>
          Margins
          <ChevronDown />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="grid w-64 grid-cols-2 gap-2">
        <Input
          type="number"
          min={0}
          max={100}
          value={margin.top}
          onChange={(e) =>
            setMargin((prev) => ({ ...prev, top: e.target.value }))
          }
        />
        <Input
          type="number"
          min={0}
          max={100}
          value={margin.right}
          onChange={(e) =>
            setMargin((prev) => ({ ...prev, right: e.target.value }))
          }
        />
        <Input
          type="number"
          min={0}
          max={100}
          value={margin.bottom}
          onChange={(e) =>
            setMargin((prev) => ({ ...prev, bottom: e.target.value }))
          }
        />
        <Input
          type="number"
          min={0}
          max={100}
          value={margin.left}
          onChange={(e) =>
            setMargin((prev) => ({ ...prev, left: e.target.value }))
          }
        />
      </PopoverContent>
    </Popover>
  );
};
export default PageMargin;
