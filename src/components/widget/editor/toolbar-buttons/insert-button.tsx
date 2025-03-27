import { ChevronDown, SquareMousePointerIcon } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ToolbarButton from "./toolbar-button";

const InsertButton: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <ToolbarButton
          className="flex w-fit items-center gap-x-2"
          onClick={() => setIsOpen(true)}
          {...props}
        >
          <SquareMousePointerIcon />
          Button
          <ChevronDown />
        </ToolbarButton>
      </DialogTrigger>

      <DialogContent>
        <Tabs defaultValue="manual" dir="rtl">
          <TabsList className="w-full rounded-md bg-slate-100 p-2">
            <TabsTrigger
              value="manual"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              دستی
            </TabsTrigger>
            <TabsTrigger
              value="default"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              پیش فرض
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <ManualTab editorRef={editorRef} onClose={() => setIsOpen(false)} />
          </TabsContent>
          <TabsContent value="default">
            <DefaultTab
              editorRef={editorRef}
              onClose={() => setIsOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const ManualTab = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const [text, setText] = useState("");

  const insertButtonIntoEditor = () => {
    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);

        const wrapper = document.createElement("div");
        wrapper.contentEditable = "false";
        wrapper.style.display = "inline-block";
        wrapper.style.maxWidth = "100%";
        wrapper.style.resize = "both";
        wrapper.style.overflow = "hidden";

        const button = document.createElement("button");
        button.textContent = text;
        button.style.width = "100%";
        button.style.height = "100%";
        button.style.padding = "0.5rem 1rem";
        button.style.borderRadius = "0.375rem";
        button.style.backgroundColor = "#0099A5";
        button.style.color = "#fff";
        button.style.cursor = "pointer";

        wrapper.appendChild(button);

        if (editorRef.current.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(wrapper);
          range.setStartAfter(wrapper);
          range.setEndAfter(wrapper);
        } else {
          editorRef.current.appendChild(wrapper);
        }
        editorRef.current.focus();
      }
    }
    onClose();
  };

  return (
    <div className="space-y-5 py-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          متن دکمه
        </label>
        <Input
          type="text"
          placeholder="متن دکمه"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          عملیات
        </label>
        <Input type="text" placeholder="عملیات" />
      </div>

      <Button className="w-full" onClick={insertButtonIntoEditor}>
        اضافه کردن
      </Button>
    </div>
  );
};

const DefaultTab = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const [type, setType] = useState("");

  // const handleClickOnButton = () => {};

  const insertButtonIntoEditor = () => {
    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);

        const wrapper = document.createElement("div");
        wrapper.contentEditable = "true";
        wrapper.style.display = "inline-block";
        wrapper.style.maxWidth = "100%";
        wrapper.style.resize = "both";
        wrapper.style.overflow = "hidden";

        const button = document.createElement("button");

        button.setAttribute("data-action", type);
        button.textContent =
          type === "next-node"
            ? "گره بعدی"
            : type === "previous-node"
              ? "گره قبلی"
              : "انصراف";

        button.contentEditable = "false";
        button.style.width = "100%";
        button.style.height = "100%";
        button.style.padding = "0.5rem 1rem";
        button.style.borderRadius = "0.375rem";
        button.style.backgroundColor =
          type === "cancel" ? "#ff4d4f" : "#0099A5";
        button.style.color = "#fff";
        button.style.cursor = "pointer";

        wrapper.appendChild(button);

        if (editorRef.current.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(wrapper);
          range.setStartAfter(wrapper);
          range.setEndAfter(wrapper);
        } else {
          editorRef.current.appendChild(wrapper);
        }
        editorRef.current.focus();
      }
    }
    onClose();
  };

  return (
    <div className="space-y-5 py-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          نوع دکمه
        </label>
        <Select onValueChange={setType} dir="rtl">
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next-node">گره بعدی</SelectItem>
            <SelectItem value="previous-node">گره قبلی</SelectItem>
            <SelectItem value="cancel">انصراف</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={insertButtonIntoEditor}>
        اضافه کردن
      </Button>
    </div>
  );
};
export default InsertButton;
