import { SaveIcon } from "lucide-react";

import { insertHtmlContent } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-buttons/toolbar-button";

const SaveForm: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef, className, ...props }) => {
  const { formId } = useParams();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => {
      const outerHtml = editorRef.current?.outerHTML;
      return insertHtmlContent(+formId!, outerHtml!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", formId] });
    }
  });

  return (
    <ToolbarButton
      className={cn(className)}
      onClick={() => mutate()}
      {...props}
    >
      <SaveIcon />
    </ToolbarButton>
  );
};

export default SaveForm;
