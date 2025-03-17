import { FormEvent, useEffect, useState } from "react";

import { createForm, editForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FormType } from "@/types/form/form";

import { useFormModalStore } from "@/hooks/store/use-form-modal-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const FormModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onClose, form } = useFormModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormType) => (form ? editForm(data) : createForm(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    }
  });

  const [isAutoHeight, setIsAutoHeight] = useState<boolean>(
    form?.isAutoHeight ?? false
  );

  const [isRepeatedImage, setIsRepeatedImage] = useState<boolean>(
    form?.isRepeatedImage ?? false
  );

  const titleText = form ? `ویرایش فرم ${form.name}` : "ساخت فرم جدید";
  const submitBtnText = form ? "ویرایش فرم" : "ساخت فرم جدید";

  useEffect(() => {
    setIsAutoHeight(form?.isAutoHeight ?? false);
    setIsRepeatedImage(form?.isRepeatedImage ?? false);
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData: Record<string, any> = {
      isAutoHeight,
      isRepeatedImage
    };

    formData.forEach((value, key) => {
      newData[key] = value;
    });

    mutate(newData as FormType);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} description="" title={titleText}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            نام
          </label>
          <Input
            type="text"
            name="name"
            defaultValue={form?.name ?? ""}
            placeholder="نام فرم"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            توضیحات
          </label>
          <Textarea
            name="description"
            defaultValue={form?.description ?? ""}
            placeholder="توضیحات..."
            className="resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              عرض
            </label>
            <Input
              type="number"
              name="sizeWidth"
              defaultValue={form?.sizeWidth ?? 0}
              placeholder="عرض فرم"
              className="resize-none"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              ارتفاع
            </label>
            <Input
              type="number"
              name="sizeHeight"
              defaultValue={form?.sizeHeight ?? 0}
              placeholder="ارتفاع فرم"
              className="resize-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              رنگ پس زمینه
            </label>
            <Input
              type="color"
              name="backgroundColor"
              defaultValue={form?.backgroundColor ?? ""}
              placeholder="رنگ فرم"
              className="resize-none"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="" className="text-sm">
              عکس پس زمینه
            </label>
            <Input
              type="file"
              name="backgroundImgPath"
              defaultValue={form?.backgroundImgPath ?? ""}
              placeholder="پس زمینه فرم"
              className="resize-none"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-x-2">
          <p className="text-sm text-slate-600">تکرار پس زمینه</p>{" "}
          <Switch checked={isAutoHeight} onCheckedChange={setIsAutoHeight} />
        </div>
        <div className="mt-5 flex items-center gap-x-2">
          <p className="text-sm text-slate-600">ارتفاع خودکار</p>{" "}
          <Switch
            checked={isRepeatedImage}
            onCheckedChange={setIsRepeatedImage}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {submitBtnText}
        </Button>
      </form>
    </Modal>
  );
};

export default FormModal;
