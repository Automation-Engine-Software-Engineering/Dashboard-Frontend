import { CheckIcon } from "lucide-react";

import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";

const AcceptedFiles: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  if (rightClickedElement.getAttribute("type") !== "file") return <></>;

  const handleAcceptedFiles = (fileType: string) => {
    const acceptedFiles =
      rightClickedElement.getAttribute("accept")?.split(",") ?? [];
    if (acceptedFiles?.includes(fileType)) {
      const index = acceptedFiles.findIndex((item) => item === fileType);
      acceptedFiles.splice(index, 1);
      rightClickedElement.setAttribute("accept", acceptedFiles.join(","));
    } else {
      acceptedFiles.push(fileType);
      rightClickedElement.setAttribute("accept", acceptedFiles.join(","));
    }
  };

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger>نوع فایل</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".jpg")}
            className="flex items-center justify-between"
          >
            .jpg
            {rightClickedElement.getAttribute("accept")?.includes(".jpg") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".jpeg")}
            className="flex items-center justify-between"
          >
            .jpeg
            {rightClickedElement.getAttribute("accept")?.includes(".jpeg") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".png")}
            className="flex items-center justify-between"
          >
            .png
            {rightClickedElement.getAttribute("accept")?.includes(".png") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".gif")}
            className="flex items-center justify-between"
          >
            .gif
            {rightClickedElement.getAttribute("accept")?.includes(".gif") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".pdf")}
            className="flex items-center justify-between"
          >
            .pdf
            {rightClickedElement.getAttribute("accept")?.includes(".pdf") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".doc")}
            className="flex items-center justify-between"
          >
            .doc
            {rightClickedElement.getAttribute("accept")?.includes(".doc") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".docx")}
            className="flex items-center justify-between"
          >
            .docx
            {rightClickedElement.getAttribute("accept")?.includes(".docx") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".xls")}
            className="flex items-center justify-between"
          >
            .xls
            {rightClickedElement.getAttribute("accept")?.includes(".xls") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".xlsx")}
            className="flex items-center justify-between"
          >
            .xlsx
            {rightClickedElement.getAttribute("accept")?.includes(".xlsx") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".ppt")}
            className="flex items-center justify-between"
          >
            .ppt
            {rightClickedElement.getAttribute("accept")?.includes(".ppt") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".pptx")}
            className="flex items-center justify-between"
          >
            .pptx
            {rightClickedElement.getAttribute("accept")?.includes(".pptx") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".txt")}
            className="flex items-center justify-between"
          >
            .txt
            {rightClickedElement.getAttribute("accept")?.includes(".txt") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".csv")}
            className="flex items-center justify-between"
          >
            .csv
            {rightClickedElement.getAttribute("accept")?.includes(".csv") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".zip")}
            className="flex items-center justify-between"
          >
            .zip
            {rightClickedElement.getAttribute("accept")?.includes(".zip") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleAcceptedFiles(".rar")}
            className="flex items-center justify-between"
          >
            .rar
            {rightClickedElement.getAttribute("accept")?.includes(".rar") && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
};
export default AcceptedFiles;
