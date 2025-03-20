import React, { useEffect, useRef, useImperativeHandle } from "react";

import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import ToolbarContextMenu from "./context-menu";

interface Props {
  onEditorChange?: (value: string) => void;
  value?: string;
  width: number;
  height: number;
  backgroundColor?: string;
}

const Editor = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.ComponentProps<"div"> & Props>
>(
  (
    {
      height,
      width,
      backgroundColor = "#ffffff",
      onEditorChange,
      value = "",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    const handleEditorChange = (e: React.FormEvent<HTMLDivElement>) => {
      const newValue = e.currentTarget.innerHTML;
      if (onEditorChange && newValue !== value) {
        onEditorChange(newValue);
      }
    };

    useEffect(() => {
      if (innerRef.current && innerRef.current.innerHTML !== value) {
        innerRef.current.innerHTML = value;
      }
    }, [value]);

    return (
      <div
        className={cn("relative bg-white", className)}
        style={{ width }}
        {...props}
      >
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              ref={innerRef}
              contentEditable
              onInput={handleEditorChange}
              style={{ minHeight: height, backgroundColor }}
              className="w-full p-2 focus-within:outline-none"
            />
          </ContextMenuTrigger>
          <ToolbarContextMenu editorRef={innerRef} />
          {children}
        </ContextMenu>
        <div
          className="absolute bottom-0 left-0 size-12"
          style={{
            background:
              "linear-gradient(45deg, rgba(248,248,251,1) 50%, rgba(200,200,200,1) 50%)"
          }}
        />
      </div>
    );
  }
);

export default Editor;
