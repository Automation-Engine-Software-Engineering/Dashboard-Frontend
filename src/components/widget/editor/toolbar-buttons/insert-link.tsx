import { ChevronDown, LinkIcon } from "lucide-react";
import React, { useState } from "react";

import { getAllWorkflowNodes } from "@/api/workflow";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { restoreSelection, saveSelection } from "@/utils/selection";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

const InsertLink: React.FC<
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
          onClick={() => {
            saveSelection();
            setIsOpen(true);
          }}
          {...props}
        >
          <LinkIcon />
          Link
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
            <TabsTrigger
              value="jump"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              لینک پرشی
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
          <TabsContent value="jump">
            <JumpTab editorRef={editorRef} onClose={() => setIsOpen(false)} />
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
  const [url, setUrl] = useState("");

  const insertLink = () => {
    restoreSelection();
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        if (url?.trim()) {
          document.execCommand("createLink", false, url);
          editorRef.current.focus();
          onClose();
        }
      }
    }
  };
  return (
    <div className="space-y-5 py-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          لینک
        </label>
        <Input
          type="text"
          placeholder="متن دکمه"
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <label className="me-5 text-sm">خودکار</label>
        <Checkbox />
      </div>
      <div className="flex items-center">
        <label className="me-5 text-sm">زمانی</label>
        <Checkbox />
      </div>

      <Button className="w-full" onClick={insertLink}>
        اضافه کردن
      </Button>
    </div>
  );
};

const JumpTab = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const [page] = useState(1);
  const [size] = useState(100);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const { data: nodes } = useQuery({
    queryFn: () => getAllWorkflowNodes({ page, size }),
    queryKey: ["nodes"]
  });

  const insertButtonIntoEditor = () => {
    if (selectedNode) {
      restoreSelection();
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const button = document.createElement("button");

        button.textContent = selectedText;
        button.contentEditable = "false";
        button.setAttribute("data-node-id", selectedNode ?? "");
        button.setAttribute("data-action", selectedNode ?? "jump-node");

        button.style.width = "fit-content";
        button.style.height = "fit-content";
        button.style.padding = "0";
        button.style.backgroundColor = "transparent";
        button.style.textDecorationStyle = "underline";
        button.style.color = "#0099A5";
        button.style.cursor = "pointer";

        if (editorRef.current?.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(button);
          range.setStartAfter(button);
          range.setEndAfter(button);
        } else {
          const spacer = document.createElement("br");
          editorRef.current?.appendChild(button);
          editorRef.current?.appendChild(spacer);
        }

        editorRef.current?.focus();
      }
      onClose();
    } else {
      toast("لطفا یک گره را انتخاب کنید");
    }
  };

  return (
    <div className="space-y-5 py-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          لینک
        </label>
        <Select onValueChange={setSelectedNode} dir="rtl">
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {nodes?.data.map((node) => (
              <SelectItem value={node.id}>{node.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
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

  const insertButtonIntoEditor = () => {
    if (type) {
      restoreSelection();
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const button = document.createElement("button");

        button.textContent = selectedText;
        button.setAttribute("data-action", type);
        button.contentEditable = "false";

        button.style.width = "fit-content";
        button.style.height = "fit-content";
        button.style.padding = "0";
        button.style.backgroundColor = "transparent";
        button.style.textDecorationStyle = "underline";
        button.style.color = "#0099A5";
        button.style.cursor = "pointer";

        if (editorRef.current?.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(button);
          range.setStartAfter(button);
          range.setEndAfter(button);
        } else {
          const spacer = document.createElement("br");
          editorRef.current?.appendChild(button);
          editorRef.current?.appendChild(spacer);
        }

        editorRef.current?.focus();
      }

      onClose();
    } else {
      toast.error("لطفا نوع دکمه را انتخاب کنید");
    }
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

export default InsertLink;
