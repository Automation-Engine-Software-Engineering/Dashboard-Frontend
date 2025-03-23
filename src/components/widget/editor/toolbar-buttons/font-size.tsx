import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

const FontSizePicker: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef, className, ...props }) => {
  const [activeFontSize, setActiveFontSize] = useState<number>(3);

  const changeFontSize = (size: number) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      document.execCommand("fontSize", false, size.toString());
      setActiveFontSize(size);
    }
  };

  const fontSizeMap: Record<number, string> = {
    1: "10",
    2: "12",
    3: "16",
    4: "18",
    5: "24",
    6: "32",
    7: "48"
  };

  const getSelectedFontSize = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;

      if (
        parentElement &&
        editorRef.current?.contains(range.commonAncestorContainer)
      ) {
        const computedFontSize =
          window.getComputedStyle(parentElement).fontSize;
        const fontSizeInPx = parseInt(computedFontSize, 10);

        const closestSize = Object.keys(fontSizeMap)
          .map(Number)
          .reduce((prev, curr) => {
            const prevValue = parseInt(fontSizeMap[prev], 10);
            const currValue = parseInt(fontSizeMap[curr], 10);
            return Math.abs(currValue - fontSizeInPx) <
              Math.abs(prevValue - fontSizeInPx)
              ? curr
              : prev;
          }, 1);

        return closestSize;
      }
    }
    return 3;
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      const fontSize = getSelectedFontSize();
      setActiveFontSize(fontSize);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-x-1 rounded-md px-2 transition-colors hover:bg-primary/20",
          className
        )}
        {...props}
      >
        <span>{fontSizeMap[activeFontSize]}</span>
        <ChevronDown size={14} />
      </PopoverTrigger>
      <PopoverContent className="w-12 divide-y divide-slate-200 p-0">
        {Object.keys(fontSizeMap).map((size) => (
          <button
            key={size}
            onClick={() => changeFontSize(Number(size))}
            className={cn(
              "block w-full py-1 text-center transition-colors hover:bg-primary/20"
            )}
          >
            {fontSizeMap[Number(size) as keyof typeof fontSizeMap]}{" "}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default FontSizePicker;
