import { ChevronDown, PaintBucket } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

import ToolbarButton from "./toolbar-button";

const BackgroundColorPicker: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  const [color] = useState<string>("#ffffff");

  return (
    <>
      <ToolbarButton className="w-fit">
        <label className="relative flex w-full items-center gap-x-1">
          <PaintBucket />
          Background Color
          <ChevronDown />
          <Input
            type="color"
            defaultValue={color}
            onChange={(e) => {
              if (editorRef.current) {
                editorRef.current.style.backgroundColor = e.target.value;
              }
            }}
            className="absolute size-0 cursor-pointer opacity-0"
          />
        </label>
      </ToolbarButton>
    </>
  );
};
export default BackgroundColorPicker;
