import { ChevronDown, SquareMousePointerIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { getEntityProperties } from "@/api/property";
import { getAllWorkflowNodes } from "@/api/workflow";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { PropertyType } from "@/types/form/property";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";

import { restoreSelection, saveSelection } from "@/utils/selection";

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
          onClick={() => {
            saveSelection();
            setIsOpen(true);
          }}
          {...props}
        >
          <SquareMousePointerIcon />
          Button
          <ChevronDown />
        </ToolbarButton>
      </DialogTrigger>

      <DialogContent>
        <Tabs defaultValue="link" dir="rtl">
          <TabsList className="w-full rounded-md bg-slate-100 p-2">
            <TabsTrigger
              value="link"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              لینک
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
              دکمه پرشی
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              API
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              واکشی دیتابیس
            </TabsTrigger>
          </TabsList>
          <TabsContent value="link">
            <LinkTab editorRef={editorRef} onClose={() => setIsOpen(false)} />
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
          <TabsContent value="api">
            <ApiTab editorRef={editorRef} onClose={() => setIsOpen(false)} />
          </TabsContent>
          <TabsContent value="database">
            <DatabaseTab
              editorRef={editorRef}
              onClose={() => setIsOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const LinkTab = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const [link, setLink] = useState("");
  const [text, setText] = useState("");

  const insertLink = () => {
    restoreSelection();
    const selection = window.getSelection();

    const wrapper = document.createElement("div");
    wrapper.contentEditable = "false";
    wrapper.style.display = "inline-block";
    wrapper.style.maxWidth = "100%";
    wrapper.style.resize = "both";
    wrapper.style.overflow = "hidden";

    const linkElem = document.createElement("a");

    linkElem.textContent = text;
    linkElem.href = link;

    linkElem.contentEditable = "false";
    linkElem.style.display = "inline-block";
    linkElem.style.textDecoration = "none";
    linkElem.style.textAlign = "center";
    linkElem.style.width = "100%";
    linkElem.style.height = "100%";
    linkElem.style.padding = "0.5rem 1rem";
    linkElem.style.borderRadius = "0.375rem";
    linkElem.style.backgroundColor = "#0099A5";
    linkElem.style.color = "#fff";
    linkElem.style.cursor = "pointer";

    wrapper.appendChild(linkElem);

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        if (link?.trim()) {
          range.deleteContents();
          range.insertNode(wrapper);
          range.setStartAfter(wrapper);
          range.setEndAfter(wrapper);
          onClose();
        }
      } else {
        const spacer = document.createElement("br");
        editorRef.current?.appendChild(wrapper);
        editorRef.current?.appendChild(spacer);
        onClose();
      }
    }
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
          لینک
        </label>
        <Input
          type="text"
          placeholder="https://"
          onChange={(e) => setLink(e.target.value)}
        />
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

        const wrapper = document.createElement("div");
        wrapper.contentEditable = "false";
        wrapper.style.display = "inline-block";
        wrapper.style.maxWidth = "100%";
        wrapper.style.resize = "both";
        wrapper.style.overflow = "hidden";

        const button = document.createElement("button");

        button.setAttribute("data-action", "jump-node");
        button.setAttribute("data-workflow-user", "");
        button.setAttribute("data-node-id", selectedNode ?? "");
        button.textContent = selectedNode;

        button.contentEditable = "false";
        button.style.width = "100%";
        button.style.height = "100%";
        button.style.padding = "0.5rem 1rem";
        button.style.borderRadius = "0.375rem";
        button.style.backgroundColor = "#0099A5";
        button.style.color = "#fff";
        button.style.cursor = "pointer";

        wrapper.appendChild(button);

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

        const wrapper = document.createElement("div");
        wrapper.contentEditable = "false";
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

const ApiTab = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const [apiUrl, setApiUrl] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [method, setMethod] = useState("");
  const [data, setData] = useState("");

  const insertButtonIntoEditor = () => {
    if (apiUrl && nextAction && method) {
      restoreSelection();
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

        button.setAttribute("data-api", apiUrl);
        button.setAttribute("data-action", nextAction);
        button.setAttribute("data-method", method);
        button.setAttribute("data-data-method", data);
        button.textContent = "درخواست به API";

        button.contentEditable = "false";
        button.style.width = "100%";
        button.style.height = "100%";
        button.style.padding = "0.5rem 1rem";
        button.style.borderRadius = "0.375rem";
        button.style.backgroundColor = "#0099A5";
        button.style.color = "#fff";
        button.style.cursor = "pointer";

        wrapper.appendChild(button);

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

      onClose();
    } else {
      toast.error("لطفا تمام مقادیر رو پر کنید");
    }
  };

  return (
    <div className="space-y-5 py-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          آدرس API
        </label>
        <Input type="text" onChange={(e) => setApiUrl(e.target.value)} />
      </div>
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          عملیات بعدی
        </label>
        <Select onValueChange={setNextAction} dir="rtl">
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
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          متد
        </label>
        <Select onValueChange={setMethod} defaultValue="get" dir="rtl">
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="get">GET</SelectItem>
            <SelectItem value="post">POST</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          دیتای ارسالی
        </label>
        <Select onValueChange={setData} dir="rtl">
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="next-node">user workflow</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={insertButtonIntoEditor}>
        اضافه کردن
      </Button>
    </div>
  );
};

const DatabaseTab = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const [selectedEntityId, setSelectedEntityId] = useState<null | string>(null);
  const [properties, setProperties] = useState<PropertyType[] | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<null | string>(null);

  const { data: entities } = useFormEntities();

  useEffect(() => {
    (async () => {
      if (selectedEntityId) {
        const response = await getEntityProperties(selectedEntityId, {
          page: 1,
          size: 100
        });

        setProperties(response?.data ?? null);
      }
    })();
  }, [selectedEntityId]);

  const insertButtonIntoEditor = () => {
    if (selectedEntityId && selectedProperty) {
      restoreSelection();
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

        button.setAttribute("data-entity", selectedEntityId);
        button.setAttribute("data-property", selectedProperty);
        button.textContent =
          properties?.find(
            (property) => property.id.toString() === selectedProperty
          )?.previewName ?? "";

        button.contentEditable = "false";
        button.style.width = "100%";
        button.style.height = "100%";
        button.style.padding = "0.5rem 1rem";
        button.style.borderRadius = "0.375rem";
        button.style.backgroundColor = "#0099A5";
        button.style.color = "#fff";
        button.style.cursor = "pointer";

        wrapper.appendChild(button);

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

      onClose();
    } else {
      toast.error("لطفا تمام مقادیر رو پر کنید");
    }
  };

  return (
    <div className="space-y-5 py-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          جدول
        </label>
        <Select
          onValueChange={setSelectedEntityId}
          defaultValue="get"
          dir="rtl"
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {entities?.data.map((entity) => (
              <SelectItem key={entity.id} value={entity.id.toString()}>
                {entity.previewName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="" className="text-sm">
          ستون
        </label>
        <Select onValueChange={setSelectedProperty} dir="rtl">
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" disabled>
              انتخاب کنید
            </SelectItem>
            {properties?.map((property) => (
              <SelectItem key={property.id} value={property.id.toString()}>
                {property.previewName}
              </SelectItem>
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

export default InsertButton;
