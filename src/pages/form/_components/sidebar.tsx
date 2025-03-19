import { Plus } from "lucide-react";

import { MoonLoader } from "react-spinners";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";
import { usePropertyModalStore } from "@/hooks/store/use-property-modal-store";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
  checkbox,
  date,
  email,
  file,
  number,
  password,
  radio,
  range,
  textfield
} from "./entities-elements";

interface Props {
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
  editorRef: React.RefObject<HTMLDivElement>;
}

const FormEditorSidebar: React.FC<Props> = ({ editorRef }) => {
  const { data: entities, isLoading } = useFormEntities();
  const { onOpen, setEntityId, setProperty } = usePropertyModalStore();
  const insertFormElement = (element: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const commonAncestor = range.commonAncestorContainer;

        if (!editorRef.current.contains(commonAncestor)) {
          return;
        }

        const fragment = document
          .createRange()
          .createContextualFragment(element);

        range.insertNode(fragment);

        range.setStartAfter(editorRef.current.lastChild!);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  return (
    <div className="sticky left-0 top-0 flex h-screen max-w-[280px] flex-1 flex-col border border-slate-300 bg-white transition-all duration-500">
      {isLoading ? (
        <Loading />
      ) : (
        <Accordion type="single" className="px-[20px]" collapsible>
          {entities?.data.map((entity) => (
            <AccordionItem value={`entity-${entity.id}`}>
              <AccordionTrigger className="py-2 text-sm">
                {entity.previewName}
              </AccordionTrigger>
              <AccordionContent>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(textfield);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  تکست
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(number);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  عدد
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(checkbox);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  چک باکس
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(date);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  تاریخ
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(email);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  ایمیل
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(file);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  فایل
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(password);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  پسوورد
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(radio);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  radio
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    insertFormElement(range);
                  }}
                  className="w-full justify-start !text-xs"
                >
                  رنج
                </Button>
                <Button
                  variant="ghost"
                  className="my-2 w-full"
                  onClick={() => {
                    setEntityId(entity.id);
                    setProperty(null);
                    onOpen();
                  }}
                >
                  <Plus />
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="#0099A5" size={50} />
    </div>
  );
};

export default FormEditorSidebar;
