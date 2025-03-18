import { FormEvent } from "react";

import { createEntity, editEntity } from "@/api/entity";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { EntityType } from "@/types/form/entity";

import { useEntityModalStore } from "@/hooks/store/use-entity-modal-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";

const EntityModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onClose, entity } = useEntityModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: EntityType) =>
      entity ? editEntity(data) : createEntity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entities"] });
    }
  });

  const titleText = entity
    ? `ویرایش جدول ${entity.previewName}`
    : "ساخت جدول جدید";
  const submitBtnText = entity ? "ویرایش جدول" : "ساخت جدول جدید";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData: Record<string, any> = {};

    formData.forEach((value, key) => {
      newData[key] = value;
    });

    mutate(newData as EntityType);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} description="" title={titleText}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            نام نمایشی
          </label>
          <Input
            type="text"
            name="previewName"
            defaultValue={entity?.previewName ?? ""}
            placeholder="نام نمایشی"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            نام جدول
          </label>
          <Input
            type="text"
            name="tableName"
            defaultValue={entity?.tableName ?? ""}
            placeholder="نام جدول"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            توضیحات
          </label>
          <Textarea
            name="description"
            defaultValue={entity?.description ?? ""}
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

export default EntityModal;
