import { ChevronDown, ImageIcon } from "lucide-react";

import { uploadImage } from "@/api/form";

import { Input } from "@/components/ui/input";

import ToolbarButton from "./toolbar-button";

const IMAGE_ROOT = import.meta.env.VITE_FORM_API_URL;

const BackgroundImagePicker: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  return (
    <>
      <ToolbarButton className="w-fit">
        <label className="relative flex w-full items-center gap-x-1">
          <ImageIcon />
          Background image
          <ChevronDown />
          <Input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const formData = new FormData();
              formData.append("image", file);

              const response = await uploadImage(formData);

              if (response?.imageUrl) {
                const imageUrl = response?.imageUrl.replace(/\\/g, "/");

                if (editorRef.current) {
                  editorRef.current.style.backgroundImage = `url(${IMAGE_ROOT}/${imageUrl})`;
                }
              } else {
                return;
              }
            }}
            className="absolute size-0 cursor-pointer opacity-0"
          />
        </label>
      </ToolbarButton>
    </>
  );
};
export default BackgroundImagePicker;
