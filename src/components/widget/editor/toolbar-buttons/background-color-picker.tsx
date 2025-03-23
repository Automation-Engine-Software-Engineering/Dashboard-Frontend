import { ChevronDown, PaintBucket } from "lucide-react";

import { editForm } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "@/hooks/server-state/use-form";

import { Input } from "@/components/ui/input";

import ToolbarButton from "./toolbar-button";

const BackgroundColorPicker: React.FC<
  React.ComponentProps<"button"> & {
    formId: number;
  }
> = ({ formId }) => {
  const queryClient = useQueryClient();

  const { data: form } = useForm(formId);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => editForm(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", `form-${formId}`] });
    }
  });

  const handleColorChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("id", formId.toString());
    formData.append("backgroundColor", e.target.value);

    mutate(formData);
  };
  return (
    <>
      <ToolbarButton className="w-fit">
        <label className="relative flex w-full items-center gap-x-1">
          <PaintBucket />
          Background Color
          <ChevronDown />
          <Input
            type="color"
            defaultValue={form?.backgroundColor ?? "#FFFFFF"}
            onBlur={handleColorChange}
            className="absolute size-0 cursor-pointer opacity-0"
            disabled={isPending}
          />
        </label>
      </ToolbarButton>
    </>
  );
};
export default BackgroundColorPicker;
