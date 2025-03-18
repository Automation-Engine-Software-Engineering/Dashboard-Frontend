import { Trash2Icon } from "lucide-react";
import { useState } from "react";

import { deleteForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { cn } from "@/lib/utils";

import AlertModal from "@/components/common/modals/alert-modal";

import ToolbarButton from "./toolbar-buttons/toolbar-button";

const DeleteForm: React.FC<React.ComponentProps<"button">> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { formId } = useParams<{ formId: string }>();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteForm(+formId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", formId] });
      navigate("/form");
    }
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          mutate();
        }}
        isLoading={isPending}
        title="آیا از حذف فرم اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و فرم بصورت دائمی حذف خواهد شد"
      />
      <ToolbarButton
        className={cn(className)}
        {...props}
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <Trash2Icon />
      </ToolbarButton>
    </>
  );
};
export default DeleteForm;
