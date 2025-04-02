import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";

import ReceiveDatabaseModal from "@/components/common/modals/receive-database-modal";

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

  const handleConvertToSelect = () => {
    if (rightClickedElement) {
      const inputElement = rightClickedElement as HTMLInputElement;
      const selectElement = document.createElement("select");

      Array.from(inputElement.attributes).forEach((attr) => {
        selectElement.setAttribute(attr.name, attr.value);
      });

      inputElement.replaceWith(selectElement);
    }
  };

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
        <DialogContent className="max-h-[90vh] overflow-y-auto">
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
              <ReceiveDatabaseModal
                onClose={() => {
                  setIsModalOpen(false);
                }}
                onConfirm={handleConvertToSelect}
                element={rightClickedElement}
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
