import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";

import { Button } from "@/components/ui/button";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RepeaterInputsProps {
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
}

const ConvertToSelect: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <ContextMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            تبدیل به دراپ دان
          </ContextMenuItem>
        </DialogTrigger>
        <DialogContent>
          <Tabs defaultValue="manual" dir="rtl">
            <TabsList className="w-full rounded-md bg-slate-100 p-2">
              <TabsTrigger
                value="manual"
                className="flex-1 rounded-md data-[state=active]:bg-primary/30"
              >
                انتخاب اطلاعات دستی
              </TabsTrigger>
              <TabsTrigger
                value="database"
                className="flex-1 rounded-md data-[state=active]:bg-primary/30"
              >
                انتخاب اطلاعات از دیتابیس
              </TabsTrigger>
            </TabsList>

            <TabsContent value="manual" className="mt-5">
              <ModalManualTab
                onClose={() => {
                  setIsModalOpen(false);
                }}
                rightClickedElement={rightClickedElement}
              />
            </TabsContent>
            <TabsContent value="database" className="mt-5">
              <ModalDatabaseTab
                onClose={() => {
                  setIsModalOpen(false);
                }}
                rightClickedElement={rightClickedElement}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ConvertToSelect;

const ModalManualTab = ({
  rightClickedElement,
  onClose
}: {
  onClose: () => void;
  rightClickedElement: HTMLElement;
}) => {
  const [values, setValues] = useState<string[]>([]);

  const handleConvertToSelect = () => {
    if (rightClickedElement) {
      const inputElement = rightClickedElement as HTMLInputElement;
      const selectElement = document.createElement("select");

      Array.from(inputElement.attributes).forEach((attr) => {
        selectElement.setAttribute(attr.name, attr.value);
      });

      values.forEach((text) => {
        const option = document.createElement("option");
        option.value = text;
        option.textContent = text;
        selectElement.appendChild(option);
      });

      inputElement.replaceWith(selectElement);

      toast.success("با موفقیت تبدیل شد");
      onClose();
    }
  };

  return (
    <>
      <div className="max-h-64 overflow-auto p-2">
        <TextfieldRepeater defaultValues={[""]} onValuesChange={setValues} />
      </div>

      <Button className="mt-5 w-full" onClick={handleConvertToSelect}>
        تبدیل
      </Button>
    </>
  );
};

const ModalDatabaseTab = ({
  rightClickedElement,
  onClose
}: {
  onClose: () => void;
  rightClickedElement: HTMLElement;
}) => {
  const { data: entities, isLoading } = useFormEntities();

  const [selectedTable, setSelectedTable] = useState<null | string>(null);
  const [filter, setFilter] = useState("");

  const handleConvertToSelect = () => {
    if (rightClickedElement) {
      const inputElement = rightClickedElement as HTMLInputElement;
      const selectElement = document.createElement("select");

      Array.from(inputElement.attributes).forEach((attr) => {
        selectElement.setAttribute(attr.name, attr.value);
      });

      selectElement.setAttribute("data-table", selectedTable ?? "");
      selectElement.setAttribute("data-filter", filter);

      const option = document.createElement("option");
      option.value = "table";
      option.innerText = `دیتابیس - ${selectedTable}`;

      selectElement.append(option);

      if (!selectedTable) {
        toast.error("لطفا یک دیتابیس رو انتخاب کنید");
        return;
      }

      inputElement.replaceWith(selectElement);
      toast.success("با موفقیت تبدیل شد");
      onClose();
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <HashLoader color="#0099A5" />
      </div>
    );

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          جدول
        </label>
        <select
          onChange={(e) => {
            setSelectedTable(e.target.value);
          }}
          className="mt-2 w-full rounded-md border border-slate-300 p-2 text-slate-800"
        >
          <option selected disabled>
            انتخاب جدول
          </option>
          {entities?.data.map((entity) => (
            <option key={entity.id} value={entity.tableName}>
              {entity.previewName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          نمایش مقدار
        </label>
        <Input
          type="text"
          className="mt-2"
          dir="ltr"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <Button className="w-full" onClick={handleConvertToSelect}>
        تبدیل
      </Button>
    </div>
  );
};

const TextfieldRepeater: React.FC<RepeaterInputsProps> = ({
  defaultValues = [],
  onValuesChange
}) => {
  const [inputs, setInputs] = useState<string[]>(defaultValues);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(inputs);
    }
  }, [inputs]);

  const handleAddInput = () => {
    setInputs((prev) => [...prev, ""]);
  };

  const handleRemoveInput = (index: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, value: string) => {
    setInputs((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  return (
    <div className="grid grid-cols-1 items-center gap-3">
      {inputs.map((value, index) => (
        <div key={index} className="flex items-center gap-x-2">
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={``}
          />
          <Button
            variant="destructive"
            onClick={() => handleRemoveInput(index)}
          >
            حذف
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={handleAddInput}>
        <PlusCircle className="text-slate-400" />
      </Button>
    </div>
  );
};
