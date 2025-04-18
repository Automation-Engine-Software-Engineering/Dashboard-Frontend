import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

import { cn } from "@/lib/utils";

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

import ToolbarContextMenu from "./context-menu";

interface Props {
  onEditorChange?: (value: string) => void;
  value?: string;
}

const Editor = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.ComponentProps<"div"> & Props>
>(({ onEditorChange, value = "", className, children, ...props }, ref) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [rightClickedElement, setRightClickedElement] =
    useState<HTMLElement | null>(null);

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

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetElement = e.target as HTMLElement;

    const iconElement = targetElement.closest("i");
    const tableElement = targetElement.closest("table");

    setRightClickedElement(iconElement || tableElement || targetElement);
  };

  return (
    <div
      className={cn("relative bg-white [&_div]:align-middle", className)}
      {...props}
    >
      <ContextMenu dir="rtl">
        <ContextMenuTrigger>
          <div
            ref={innerRef}
            contentEditable
            onInput={handleEditorChange}
            onContextMenu={handleContextMenu}
            className="w-full focus-within:outline-none"
          />
        </ContextMenuTrigger>
        <ToolbarContextMenu
          editorRef={innerRef}
          rightClickedElement={rightClickedElement}
        />
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
});

export default Editor;
