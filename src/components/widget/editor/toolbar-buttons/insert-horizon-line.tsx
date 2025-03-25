import { MinusIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import ToolbarButton from "./toolbar-button";

const InsertHorizonLine: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const [topMargin, setTopMargin] = useState(0);
  const [bottomMargin, setBottomMargin] = useState(0);

  const handleInsertHorizontalLine = () => {
    const selection = window.getSelection();

    if (editorRef.current) {
      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const hr = document.createElement("hr");
        hr.style.marginTop = `${topMargin}px`;
        hr.style.marginBottom = `${bottomMargin}px`;
        if (editorRef.current?.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(hr);
          range.setStartAfter(hr);
          range.setEndAfter(hr);
        } else {
          editorRef.current.appendChild(hr);
        }
      }
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          asChild
          onClick={() => {
            document.execCommand("insertHorizontalRule", true);
          }}
        >
          <ToolbarButton className={cn(className)} {...props}>
            <MinusIcon />
          </ToolbarButton>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="grid w-64 grid-cols-2 gap-2">
          <Input
            type="number"
            value={topMargin}
            defaultValue={0}
            min={0}
            pattern="[0-9]*"
            onChange={(e) => {
              setTopMargin(+e.target.value);
            }}
          />
          <Input
            type="number"
            value={bottomMargin}
            defaultValue={0}
            min={0}
            pattern="[0-9]*"
            onChange={(e) => {
              setBottomMargin(+e.target.value);
            }}
          />

          <Button
            className="col-span-full"
            onClick={handleInsertHorizontalLine}
          >
            Insert
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InsertHorizonLine;
