import { FormEvent } from "react";

import { createForm, editForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useFormModalStore } from "@/hooks/store/use-form-modal-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";

const FormModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onClose, form } = useFormModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => (form ? editForm(data) : createForm(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      onClose();
    }
  });

  const titleText = form ? `ویرایش فرم ${form.name}` : "ساخت فرم جدید";
  const submitBtnText = form ? "ویرایش فرم" : "ساخت فرم جدید";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!form) {
      formData.append(
        "HtmlFormBody",
        `<div style="width:1000px; min-height:500px; background-color:#FFFFFF">ساخته شده توسط تیم پارسه آذین مبین</div>`
      );
    } else {
      formData.append("id", String(form.id));
      formData.append("HtmlFormBody", form.htmlFormBody);
    }

    mutate(formData);
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
        <Button type="submit" className="w-full" disabled={isPending}>
          {submitBtnText}
        </Button>
      </form>
    </Modal>
  );
};

export default FormModal;
