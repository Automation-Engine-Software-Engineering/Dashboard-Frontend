import { LucideLoader2, SaveIcon } from "lucide-react";
import { useEffect } from "react";

import { insertHtmlContent } from "@/api/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-buttons/toolbar-button";

const SaveForm: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef, className, ...props }) => {
  const { formId } = useParams();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const outerHtml = editorRef.current?.outerHTML;
      return insertHtmlContent(+formId!, outerHtml!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", formId] });
    }
  });

  const autoSave = useDebouncedCallback(() => {
    mutate();
  }, 3000);

  useEffect(() => {
    if (editorRef) {
      editorRef.current?.addEventListener("input", autoSave);
    }

    return () => {
      if (editorRef) {
        editorRef.current?.removeEventListener("input", autoSave);
      }
    };
  }, [editorRef]);

  return (
    <ToolbarButton
      className={cn(className)}
      onClick={() => mutate()}
      disabled={isPending}
      {...props}
    >
      {isPending ? (
        <LucideLoader2 className="animate-spin text-primary" />
      ) : (
        <SaveIcon />
      )}
    </ToolbarButton>
  );
};

export default SaveForm;
