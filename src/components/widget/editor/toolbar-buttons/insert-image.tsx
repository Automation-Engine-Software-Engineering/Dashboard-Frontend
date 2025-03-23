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
      if (selection?.rangeCount) {
        const range = selection?.getRangeAt(0);
        const wrapper = document.createElement("div");
        wrapper.id = "image-wrapper";
        wrapper.className = "wrapper";
        wrapper.contentEditable = "false";
        wrapper.setAttribute("data-type", "image");
        wrapper.style.display = "inline-block";
        wrapper.style.maxWidth = "100%";
        wrapper.style.resize = "both";
        wrapper.style.overflow = "hidden";
        wrapper.style.minWidth = "100px";
        wrapper.style.minHeight = "100px";

        const img = document.createElement("img");
        img.src = url;
        img.draggable = false;
        img.style.width = "100%";
        img.style.height = "100%";
        img.contentEditable = "false";
        wrapper.appendChild(img);

        if (editorRef.current.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(wrapper);

          range.setStartAfter(wrapper);
          range.setEndAfter(wrapper);
        } else {
          editorRef.current.appendChild(wrapper);
        }
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
