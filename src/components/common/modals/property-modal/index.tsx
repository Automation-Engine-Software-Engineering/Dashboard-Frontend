import { FormEvent, useEffect, useState } from "react";

import { createProperty, editProperty } from "@/api/property";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PropertyType } from "@/types/form/property";

import { usePropertyModalStore } from "@/hooks/store/use-property-modal-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const formInputType = {
  "1": "number",
  "2": "range",
  "3": "text",
  "4": "text",
  "5": "checkbox",
  "6": "date",
  "7": "file",
  "8": "color",
  "9": "email",
  "10": "password"
};

const PropertyModal = () => {
  const queryClient = useQueryClient();
  const { isOpen, onClose, property, entityId } = usePropertyModalStore();

  const [selectedType, setSelectedType] = useState<keyof typeof formInputType>(
    (property?.type as keyof typeof formInputType) ?? "1"
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (data: PropertyType) =>
      property ? editProperty(data) : createProperty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    }
  });

  const [allowNull, setAllowNull] = useState<boolean>(
    property?.allowNull ?? false
  );

  const titleText = property
    ? `ویرایش عنصر ${property.previewName}`
    : "ساخت عنصر جدید";
  const submitBtnText = property ? "ویرایش عنصر" : "ساخت عنصر جدید";

  useEffect(() => {
    setAllowNull(property?.allowNull ?? false);
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData: Record<string, any> = {
      allowNull,
      entityId
    };

    formData.forEach((value, key) => {
      newData[key] = value;
    });

    mutate(newData as PropertyType);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} description="" title={titleText}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              نام نمایشی
            </label>
            <Input
              type="text"
              name="previewName"
              defaultValue={property?.previewName ?? ""}
              placeholder="نام نمایشی"
              required
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              نام عنصر
            </label>
            <Input
              type="text"
              name="propertyName"
              defaultValue={property?.propertyName ?? ""}
              placeholder="نام عنصر"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            توضیحات
          </label>
          <Textarea
            name="description"
            defaultValue={property?.description ?? ""}
            placeholder="توضیحات..."
            className="resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              نوع عنصر
            </label>
            <select
              name="type"
              defaultValue={property?.type ?? ""}
              className="h-10 rounded-md border border-slate-300 px-3 py-2 text-sm focus-within:border-primary focus-within:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              onChange={(e) => {
                setSelectedType(e.target.value as keyof typeof formInputType);
              }}
              required
            >
              <option value="1">عدد</option>
              <option value="3">متن کوتاه</option>
              <option value="4">متن بلند</option>
              <option value="6">زمان</option>
              <option value="5">چک باکس</option>
              <option value="8">رنگ</option>
              <option value="9">ایمیل</option>
              <option value="7">فایل</option>
              <option value="10">پسوورد</option>
              <option value="2">رنج</option>
            </select>
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              مقدار پیش فرض
            </label>
            <Input
              type={formInputType[selectedType]}
              name="defaultValue"
              defaultValue={property?.defaultValue ?? ""}
              placeholder="مقدار پیش فرض"
            />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-x-2">
          <p className="text-sm text-slate-600">بدون مقدار</p>{" "}
          <Switch checked={allowNull} onCheckedChange={setAllowNull} />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {submitBtnText}
        </Button>
      </form>
    </Modal>
  );
};

export default PropertyModal;
