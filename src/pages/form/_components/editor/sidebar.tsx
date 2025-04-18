import { ChevronLeftIcon, Plus } from "lucide-react";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { useForm } from "@/hooks/server-state/use-form";
import { usePropertyModalStore } from "@/hooks/store/use-property-modal-store";

import { formInputType } from "@/components/common/modals/property-modal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { createInput } from "./entities-elements";

interface Props {
  setEditorData: React.Dispatch<React.SetStateAction<string>>;
  editorRef: React.RefObject<HTMLDivElement>;
}

const FormEditorSidebar: React.FC<Props> = ({ editorRef }) => {
  const { formId } = useParams<{ formId: string }>();
  const { data: form, isLoading } = useForm(+formId!);

  const [isOpen, setIsOpen] = useState(false);

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
    <div
      className={cn(
        "absolute left-0 top-0 z-40 border border-slate-300 bg-white pb-20 pt-5"
      )}
    >
      <Button
        variant="secondary"
        className="absolute right-0 top-10 h-20 translate-x-full rounded-e-none p-0 px-1"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <ChevronLeftIcon
          className={cn("text-white", isOpen ? "rotate-0" : "rotate-180")}
        />
      </Button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-700",
          isOpen ? "w-[350px]" : "w-0"
        )}
      >
        {isLoading ? (
          <Loading />
        ) : form?.entities?.length ? (
          <Accordion type="single" className="px-[20px]" collapsible>
            {form?.entities?.map((entity) => (
              <AccordionItem value={`entity-${entity.id}`}>
                <AccordionTrigger className="text-nowrap py-2 text-sm">
                  {entity.previewName}
                </AccordionTrigger>
                <AccordionContent>
                  {entity?.properties.map((property) => {
                    console.log(property);
                    const mappedType =
                      formInputType[
                        property.type as keyof typeof formInputType
                      ];
                    return (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          insertFormElement(
                            createInput({
                              inputId: property.id,
                              input: mappedType,
                              defaultValue: property.defaultValue ?? ""
                            })
                          );
                        }}
                        className="w-full justify-start text-nowrap !text-xs"
                      >
                        {property.previewName}
                      </Button>
                    );
                  })}
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
        ) : (
          <EmptyState />
        )}
      </div>{" "}
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

const EmptyState = () => (
  <div className="flex h-1/2 items-center justify-center">
    <p className="text-slate-600">جدولی یافت نشد</p>
  </div>
);

export default FormEditorSidebar;
