import React, { useState, useEffect } from "react";

import ToolbarButton from "./toolbar-button";

interface Props {
  editorRef: React.RefObject<HTMLDivElement>;
}

const FontPicker: React.FC<Props> = ({ editorRef }) => {
  const [selectedFont, setSelectedFont] = useState<string>("");

  const getSelectedTextFont = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;

      if (parentElement) {
        const fontFamily = window.getComputedStyle(parentElement).fontFamily;
        return fontFamily.replace(/"/g, "");
      }
    }
    return "";
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const font = event.target.value;
    setSelectedFont(font);

    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          document.execCommand("fontName", false, font);
          editorRef.current.focus();
        }
      }
    }
  };

  const updateSelectedTextFont = () => {
    const font = getSelectedTextFont();
    setSelectedFont(font);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener("mouseup", updateSelectedTextFont);
      editorRef.current.addEventListener("keyup", updateSelectedTextFont);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener(
          "mouseup",
          updateSelectedTextFont
        );
        editorRef.current.removeEventListener("keyup", updateSelectedTextFont);
      }
    };
  }, [editorRef]);

  return (
    <ToolbarButton className="size-fit">
      <select
        value={selectedFont}
        onChange={handleFontChange}
        className="rounded border px-2 py-1"
      >
        <option value="">Default</option>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
      </select>
    </ToolbarButton>
  );
};

export default FontPicker;
