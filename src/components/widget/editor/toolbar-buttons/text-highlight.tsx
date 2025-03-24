import { Droplet } from "lucide-react";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

interface Props {
  editorRef: React.RefObject<HTMLDivElement>;
}

const TextHighlight: React.FC<Props> = ({ editorRef }) => {
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");

  const getSelectedTextColor = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        const parentElement = range.commonAncestorContainer.parentElement;

        if (parentElement) {
          const color = window.getComputedStyle(parentElement).backgroundColor;
          return color;
        }
      }
    }

    return "#FFFFFF";
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedColor(color);

    document.execCommand("backColor", false, color);
  };

  const updateSelectedTextColor = () => {
    const color = getSelectedTextColor();
    setSelectedColor(color);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener("mouseup", updateSelectedTextColor);
      editorRef.current.addEventListener("keyup", updateSelectedTextColor);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener(
          "mouseup",
          updateSelectedTextColor
        );
        editorRef.current.removeEventListener("keyup", updateSelectedTextColor);
      }
    };
  }, [editorRef]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton>
          <span className="w-full bg-yellow-300 text-lg">ab</span>
        </ToolbarButton>
      </PopoverTrigger>

      <PopoverContent className="w-64">
        <Input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
        />
        <Button
          variant="ghost"
          className="mt-2 w-full justify-start"
          onClick={() => {
            document.execCommand("backColor", false, "transparent");
          }}
        >
          <Droplet />
          بدون هایلایت
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default TextHighlight;
