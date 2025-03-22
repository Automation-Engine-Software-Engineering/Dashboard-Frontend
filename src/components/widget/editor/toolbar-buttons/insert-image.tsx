import { Image } from "lucide-react";

import { uploadImage } from "@/api/form";
import toast from "react-hot-toast";

import ToolbarButton from "./toolbar-button";

const IMAGE_ROOT = import.meta.env.VITE_FORM_API_URL;

const InsertImage: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  const handleInsertImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImage(formData);

    if (response?.imageUrl) {
      insertImageIntoEditor(`${IMAGE_ROOT}/${response.imageUrl}`);
    } else {
      toast.error("خطا در اضافه کردن عکس");
    }

    event.target.value = "";
  };

  const insertImageIntoEditor = (url: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        const img = document.createElement("img");
        img.src = url;
        img.style.resize = "both";
        img.style.overflow = "hidden";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.contentEditable = "false";
        range.deleteContents();
        range.insertNode(img);

        range.setStartAfter(img);
        range.setEndAfter(img);

        editorRef.current.focus();
      }
    }
  };

  return (
    <ToolbarButton className="size-fit">
      <label className="relative flex size-full items-center gap-x-2 font-sans">
        <Image />
        Picture
        <input
          type="file"
          accept="images/*"
          onInput={handleInsertImage}
          className="absolute size-0 cursor-pointer opacity-0"
        />
      </label>
    </ToolbarButton>
  );
};
export default InsertImage;
