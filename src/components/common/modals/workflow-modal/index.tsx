import { FormEvent } from "react";

import { createWorkflow, editWorkflow } from "@/api/workflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useWorkflowModalStore } from "@/hooks/store/use-workflow-modal-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";

const WorkflowModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onClose, workflow } = useWorkflowModalStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) =>
      workflow ? editWorkflow(workflow.id, data) : createWorkflow(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
      onClose();
    }
  });

  const titleText = workflow
    ? `ویرایش گردش کار ${workflow.name}`
    : "ساخت گردش کار جدید";
  const submitBtnText = workflow ? "ویرایش گردش کار" : "ساخت گردش کار جدید";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newData = Object.fromEntries(formData);

    mutate(newData);
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
            defaultValue={workflow?.name ?? ""}
            placeholder="نام گردش کار"
            required
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <label htmlFor="" className="text-sm">
            توضیحات
          </label>
          <Textarea
            name="description"
            defaultValue={workflow?.description ?? ""}
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

export default WorkflowModal;
