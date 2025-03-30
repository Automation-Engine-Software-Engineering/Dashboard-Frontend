import React, { useState } from "react";

import { getAllWorkflowNodes } from "@/api/workflow";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ContextMenuItem } from "@/components/ui/context-menu";
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

const ConvertToLink: React.FC<
  React.ComponentProps<"button"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <ContextMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          لینک
        </ContextMenuItem>
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
            <ManualTab
              rightClickedElement={rightClickedElement}
              onClose={() => setIsOpen(false)}
            />
          </TabsContent>
          <TabsContent value="default">
            <DefaultTab
              rightClickedElement={rightClickedElement}
              onClose={() => setIsOpen(false)}
            />
          </TabsContent>
          <TabsContent value="jump">
            <JumpTab
              rightClickedElement={rightClickedElement}
              onClose={() => setIsOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const ManualTab = ({
  rightClickedElement,
  onClose
}: {
  rightClickedElement: HTMLElement;
  onClose: () => void;
}) => {
  const [url, setUrl] = useState("");

  const insertLink = () => {
    const linkElem = document.createElement("a");

    linkElem.href = url;
    linkElem.target = "_blank";
    if (url.startsWith("http")) linkElem.rel = "noopener noreferrer";
    if (url.trim()) {
      linkElem.appendChild(rightClickedElement.cloneNode(true));
      onClose();
    }

    rightClickedElement.replaceWith(linkElem);
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
  rightClickedElement,
  onClose
}: {
  rightClickedElement: HTMLElement;
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
      const button = document.createElement("button");

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

      button.appendChild(rightClickedElement.cloneNode(true));

      rightClickedElement.replaceWith(button);
      onClose();
    } else {
      toast.error("لطفا یک گره را انتخاب کنید");
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
  rightClickedElement,
  onClose
}: {
  rightClickedElement: HTMLElement;
  onClose: () => void;
}) => {
  const [type, setType] = useState("");

  const insertButtonIntoEditor = () => {
    if (type) {
      const button = document.createElement("button");

      button.setAttribute("data-action", type);
      button.contentEditable = "false";

      button.style.width = "fit-content";
      button.style.height = "fit-content";
      button.style.padding = "0";
      button.style.backgroundColor = "transparent";
      button.style.textDecorationStyle = "underline";
      button.style.color = "#0099A5";
      button.style.cursor = "pointer";

      button.appendChild(rightClickedElement.cloneNode(true));

      rightClickedElement.replaceWith(button);

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

export default ConvertToLink;
