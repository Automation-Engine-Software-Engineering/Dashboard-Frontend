import { useEffect, useState } from "react";

import { ContextMenuItem } from "@/components/ui/context-menu";

const ColorPicker: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const [color, setColor] = useState("#000000");
  const rgbStringToHex = (rgbString: string): string => {
    const rgbArray = rgbString.match(/\d+/g);

    const [r, g, b] = rgbArray!.map(Number);

    const toHex = (n: number) => {
      const hex = Math.min(255, Math.max(0, n)).toString(16).padStart(2, "0");
      return hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  useEffect(() => {
    setColor(
      rgbStringToHex(
        rightClickedElement.style.backgroundColor || "rgb(0, 0, 0)"
      )
    );
  }, []);

  return (
    <>
      <ContextMenuItem className="p-0">
        <label
          className="flex w-full items-center justify-between px-2 py-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          رنگ دکمه
          <span
            className="block size-5 rounded-full border border-slate-300"
            style={{ backgroundColor: color }}
          ></span>
          <input
            type="color"
            className="absolute size-0 cursor-pointer opacity-0"
            defaultValue={color}
            onChange={(e) => {
              setColor(e.target.value);
              rightClickedElement.style.backgroundColor = e.target.value;
            }}
          />
        </label>
      </ContextMenuItem>
    </>
  );
};
export default ColorPicker;
