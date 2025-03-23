import { useEffect, useState } from "react";

import ToolbarButton from "./toolbar-button";

const Orientation: React.FC<
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
    <ToolbarButton
      className="flex w-fit items-center gap-x-1"
      onClick={() => {
        setSize((prev) => ({
          width: prev.minHeight,
          minHeight: prev.width
        }));
      }}
    >
      <svg
        width="28"
        height="25"
        viewBox="0 0 28 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.168 1.66663H12.3346C11.8926 1.66663 11.4687 1.84222 11.1561 2.15478C10.8436 2.46734 10.668 2.89127 10.668 3.33329V16.6666C10.668 17.1087 10.8436 17.5326 11.1561 17.8451C11.4687 18.1577 11.8926 18.3333 12.3346 18.3333H22.3346C22.7767 18.3333 23.2006 18.1577 23.5131 17.8451C23.8257 17.5326 24.0013 17.1087 24.0013 16.6666V7.49996M18.168 1.66663L24.0013 7.49996M18.168 1.66663V7.49996H24.0013"
          stroke="#273646"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.6667 20.8333C18.6667 21.2754 18.4911 21.6993 18.1785 22.0118C17.866 22.3244 17.442 22.5 17 22.5H3.66667C3.22464 22.5 2.80072 22.3244 2.48816 22.0118C2.17559 21.6993 2 21.2754 2 20.8333V9.16667C2 8.72464 2.17559 8.30072 2.48816 7.98816C2.80072 7.67559 3.22464 7.5 3.66667 7.5H7.83333L9.5 10H17C17.442 10 17.866 10.1756 18.1785 10.4882C18.4911 10.8007 18.6667 11.2246 18.6667 11.6667V20.8333Z"
          stroke="#273646"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Orientation
    </ToolbarButton>
  );
};
export default Orientation;
