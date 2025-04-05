import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { icons } from "@/constants/editor/icons";

import { restoreSelection, saveSelection } from "@/utils/selection";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import ToolbarButton from "./toolbar-button";

const InsertIcon: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  const [count, setCount] = useState(20);
  const [search, setSearch] = useState("");

  const insertIconIntoEditor = (icon: string) => {
    if (editorRef.current) {
      const wrapper = document.createElement("div");
      wrapper.contentEditable = "false";
      wrapper.style.display = "inline-block";
      wrapper.style.maxWidth = "100%";

      wrapper.innerHTML = `<div class="tooltip"><div class="tooltiptext"/></div> <i class="${icon}"></i>`;

      restoreSelection();
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);

        if (editorRef.current?.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(wrapper);
          range.setStartAfter(wrapper);
          range.setEndAfter(wrapper);
        } else {
          const spacer = document.createElement("br");
          editorRef.current?.appendChild(wrapper);
          editorRef.current?.appendChild(spacer);
        }

        editorRef.current?.focus();
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          className="flex w-fit items-center gap-x-1"
          onClick={() => {
            saveSelection();
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_681_1065)">
              <path
                d="M14.7423 1.92295C14.1285 2.35592 13.4489 2.68708 12.7296 2.90366C12.3436 2.45978 11.8305 2.14517 11.2599 2.00238C10.6892 1.85959 10.0884 1.89551 9.53886 2.10528C8.98926 2.31505 8.51736 2.68855 8.18695 3.17526C7.85655 3.66197 7.68359 4.23841 7.69148 4.82662V5.46761C6.56503 5.49682 5.44884 5.24699 4.44232 4.74037C3.4358 4.23376 2.5702 3.48608 1.9226 2.56394C1.9226 2.56394 -0.641349 8.33282 5.12753 10.8968C3.80744 11.7928 2.23486 12.2422 0.640625 12.1787C6.40951 15.3837 13.4604 12.1787 13.4604 4.80739C13.4598 4.62885 13.4426 4.45074 13.4091 4.27537C14.0633 3.63021 14.5249 2.81566 14.7423 1.92295Z"
                stroke="#273646"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <path
              d="M18.7192 11.5378H16.1552L14.2322 17.3067L10.3863 5.76892L8.46336 11.5378H5.89941"
              stroke="#273646"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <clipPath id="clip0_681_1065">
                <rect width="15.3837" height="15.3837" fill="white" />
              </clipPath>
            </defs>
          </svg>
          Icons
          <ChevronDown />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <Input
          type="text"
          placeholder="جستوجو"
          className="mb-2"
          onChange={(e) => setSearch(e.target.value)}
        />
        <ScrollArea className="h-72 w-64">
          <div className="grid grid-cols-5 justify-items-center gap-1 p-1">
            {icons
              .filter((icon) =>
                icon
                  .toLocaleLowerCase()
                  .split("-")
                  .join(" ")
                  .includes(search.toLocaleLowerCase())
              )
              .slice(0, count)
              .map((icon) => (
                <Button
                  key={icon}
                  variant="ghost"
                  className="size-full px-0 py-2 [&_svg]:size-7"
                  onClick={() => insertIconIntoEditor(icon)}
                >
                  <i className={icon}></i>
                </Button>
              ))}
          </div>
        </ScrollArea>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            setCount((prev) => prev + 20);
          }}
        >
          بیشتر ...
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default InsertIcon;
