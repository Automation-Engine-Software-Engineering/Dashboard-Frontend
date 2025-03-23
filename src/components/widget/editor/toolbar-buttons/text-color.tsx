import React, { useState, useEffect } from "react";

import ToolbarButton from "./toolbar-button";

interface Props {
  editorRef: React.RefObject<HTMLDivElement>;
}

const TextColorPicker: React.FC<Props> = ({ editorRef }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const getSelectedTextColor = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        const parentElement = range.commonAncestorContainer.parentElement;

        if (parentElement) {
          const color = window.getComputedStyle(parentElement).color;
          return color;
        }
      }
    }

    return "#000000";
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setSelectedColor(color);

    document.execCommand("foreColor", false, color);
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
    <ToolbarButton>
      <label className="relative flex size-full justify-center">
        <span className="text-lg font-bold">A</span>
        <span
          className="absolute bottom-0 h-1 w-6 rounded-full"
          style={{ backgroundColor: selectedColor }}
        />
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          className="absolute size-0 cursor-pointer opacity-0"
        />
      </label>
    </ToolbarButton>
  );
};

export default TextColorPicker;
