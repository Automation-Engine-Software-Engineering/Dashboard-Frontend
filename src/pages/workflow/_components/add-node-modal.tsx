import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { getAllEntities } from "@/api/entity";
import { getAllForms } from "@/api/form";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { EntityType } from "@/types/form/entity";
import { FormType } from "@/types/form/form";

import { useFlowStore } from "@/hooks/store/use-workflow-store";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddNodeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [nodeType, setNodeType] = useState<string | null>(null);
  const [listItems, setListItems] = useState<
    FormType[] | EntityType[] | null | undefined
  >(null);

  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [isLoadingData, setIsLoadingData] = useState(false);

  const { setNodes } = useFlowStore();

  const handleTypeChange = async (val: string) => {
    setIsLoadingData(true);
    setNodeType(val);
    setListItems([]);
    setSelectedItem(null);

    try {
      switch (val) {
        case "form": {
          const response = await getAllForms({ page: 1, size: 100 });
          setListItems(response?.data);
          break;
        }
        case "table": {
          const response = await getAllEntities({ page: 1, size: 100 });
          setListItems(response?.data);
          break;
        }
        default:
          break;
      }
    } catch {
      toast.error("خطایی رخ داده است");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleCreateNode = () => {
    if (nodeType) {
      if (selectedItem) {
        const itemName = listItems?.find((item) => item.id === selectedItem);

        const newNode = {
          id: nanoid(),
          type: "custom",
          data: {
            name:
              nodeType === "form"
                ? (itemName as FormType).name
                : (itemName as EntityType).previewName,

            icon: nodeType === "form" ? "file-text" : "table"
          },
          position: { x: Math.random() * 500, y: Math.random() * 200 }
        };

        setNodes((prev) => [...prev, newNode]);

        onClose();
      } else {
        toast.error("لطفا یک ایتم را انتخاب کنید");
      }
    } else {
      toast.error("لطفا نوع رشته را انتخاب کنید");
    }
  };

  useEffect(() => {
    setNodeType(null);
    setListItems(null);
    setSelectedItem(null);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ساخت رشته جدید"
      description=""
    >
      <div className="space-y-1">
        <label className="text-sm">نوع رشته</label>
        <Select onValueChange={handleTypeChange} dir="rtl">
          <SelectTrigger>
            <SelectValue placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="form">فرم</SelectItem>
            <SelectItem value="table">جدول</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea
        className="mt-5 h-64 w-full rounded-md border border-slate-300"
        dir="rtl"
      >
        {nodeType ? (
          isLoadingData ? (
            <div className="mt-10 flex w-full justify-center">
              <HashLoader color="#0099A5" size={40} />
            </div>
          ) : (
            !!listItems?.length &&
            listItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item.id)}
                className={cn(
                  "items-center` flex cursor-pointer border-b border-b-slate-300 px-5 py-3 text-sm transition-colors hover:bg-primary/20",
                  selectedItem === item.id &&
                    "pointer-events-none bg-primary/20"
                )}
              >
                {nodeType === "form"
                  ? (item as FormType).name
                  : (item as EntityType).previewName}

                {selectedItem === item.id && (
                  <Check className="ms-auto" size={20} color="#0099A5" />
                )}
              </div>
            ))
          )
        ) : (
          <div className="mt-5 text-center text-sm font-bold text-slate-400">
            لطفا نوع رشته را انتخاب کنید
          </div>
        )}
      </ScrollArea>
      <Button className="mt-5 w-full" onClick={handleCreateNode}>
        اضافه کردن
      </Button>
    </Modal>
  );
};
export default AddNodeModal;
