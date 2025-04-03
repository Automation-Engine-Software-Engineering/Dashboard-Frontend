import { Node } from "@xyflow/react";
import { Check } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";

import { getAllForms } from "@/api/form";
import { useInfiniteQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

interface ContentProps {
  setData: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
}

enum Type {
  form = 1,
  dynamic = 2
}

enum TypeIcons {
  form = "file-text",
  dynamic = "code-xml"
}

const AddNodeModal: React.FC<ModalProps> = ({ isOpen, onClose, setNodes }) => {
  const [newNodeData, setNewNodeData] = useState<Record<string, any> | null>(
    null
  );
  const [nodeType, setNodeType] = useState<keyof typeof Type | null>(null);

  const content = useMemo(() => {
    switch (nodeType) {
      case "form":
        return <FormContent setData={setNewNodeData} />;

      case "dynamic":
        return <DynamicContent setData={setNewNodeData} />;
      default:
        return <></>;
    }
  }, [nodeType]);

  const handleCreateNode = () => {
    if (nodeType) {
      if (newNodeData) {
        const newNode: Node = {
          id: nanoid(),
          type: "custom",
          data: newNodeData ?? {},
          position: { x: Math.random() * 500, y: Math.random() * 200 }
        };

        setNodes((prev) => [...prev, newNode]);
        onClose();
      } else {
        toast.error("یک نوع را انتخاب کنید");
      }
    } else {
      toast.error("اطلاعات را تکمیل کنید");
    }
  };

  useEffect(() => {
    setNodeType(null);
    setNewNodeData(null);
  }, [isOpen]);

  useEffect(() => {
    setNewNodeData(null);
  }, [nodeType]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ساخت رشته جدید"
      description=""
    >
      <div className="space-y-1">
        <label className="text-sm">نوع گره</label>
        <Select
          onValueChange={(val) => {
            setNodeType(val as keyof typeof Type);
          }}
          dir="rtl"
        >
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="form">فرم</SelectItem>
            <SelectItem value="dynamic">داینامیک</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">{content}</div>

      <Button className="mt-5 w-full" onClick={handleCreateNode}>
        اضافه کردن
      </Button>
    </Modal>
  );
};

const FormContent: React.FC<ContentProps> = ({ setData }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const { ref, inView } = useInView();

  const navigate = useNavigate();

  const { isFetchingNextPage, hasNextPage, isLoading, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["forms"],
      queryFn: async ({ pageParam }) => {
        return await getAllForms({ page: pageParam, size: 10 });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPage?.data.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      }
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading)
    return (
      <div className="flex h-32 w-full items-center justify-center">
        <HashLoader color="#0099A5" size={40} />
      </div>
    );

  return (
    <>
      <ScrollArea
        className="h-64 w-full rounded-md border border-slate-300"
        dir="rtl"
      >
        {data?.pages.map((page, index) => (
          <Fragment key={index + 1}>
            {page?.data.map((form) => (
              <div
                key={form.id}
                className={cn(
                  "flex cursor-pointer items-center border-b border-b-slate-300 px-5 py-3 text-sm transition-colors hover:bg-primary/20",
                  selected === form.id && "pointer-events-none bg-primary/20"
                )}
                onClick={() => {
                  setData({
                    name: form.name,
                    formId: form.id,
                    type: Type.form,
                    icon: TypeIcons.form
                  });
                  setSelected(form.id);
                }}
              >
                {form.name}
                {selected === form.id && (
                  <Check className="ml-auto" size={20} color="#0099A5" />
                )}
              </div>
            ))}
          </Fragment>
        ))}

        {hasNextPage && (
          <div
            ref={ref}
            className="flex w-full justify-center py-1 text-center"
          >
            {isFetchingNextPage ? (
              <HashLoader size={30} color="#0099A5" />
            ) : (
              "بیشتر"
            )}
          </div>
        )}
      </ScrollArea>
      <Button
        variant="outline"
        className="mt-5 w-full"
        onClick={() => navigate("/form")}
      >
        افزودن فرم جدید
      </Button>
    </>
  );
};

const DynamicContent: React.FC<ContentProps> = ({ setData }) => {
  useEffect(() => {
    setData((prev) => ({
      ...prev,
      icon: TypeIcons.dynamic,
      type: Type.dynamic
    }));
  }, [setData]);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <label>نام فایل</label>
        <Input
          placeholder="نام فایل"
          onChange={(e) => {
            setData((prev) => ({ ...prev, DllName: e.target.value }));
          }}
        />
      </div>
      <div className="space-y-1">
        <label>فایل dll</label>
        <Input
          type="file"
          accept=".dll"
          onChange={() => {
            // TODO: handle upload file
            // setData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </div>
    </div>
  );
};

export default AddNodeModal;
