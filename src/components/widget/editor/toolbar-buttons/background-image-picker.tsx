import { ImageIcon } from "lucide-react";
import { ChangeEvent } from "react";

import { editForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";

import ToolbarButton from "./toolbar-button";

const BackgroundImagePicker: React.FC<
  React.ComponentProps<"button"> & {
    formId: number;
  }
> = ({ formId }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => editForm(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", `form-${formId}`] });
    }
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("فایلی انتخاب نشده است");
      return;
    }

    const formData = new FormData();
    formData.append("id", formId.toString());
    formData.append("backgroundImg", file);

    mutate(formData);
  };
  return (
    <ToolbarButton className="w-fit">
      <label className="relative flex w-full items-center gap-x-1">
        <ImageIcon />
        Background Image
        <Input
          type="file"
          accept="images/*"
          onChange={handleImageChange}
          className="absolute size-0 cursor-pointer opacity-0"
          disabled={isPending}
        />
      </label>
    </ToolbarButton>
  );
};
export default BackgroundImagePicker;
