import { MoonLoader } from "react-spinners";

import { useFormEntities } from "@/hooks/use-form-entities";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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

  const insertFormElement = (element: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

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
          {entities?.map((entity) => (
            <AccordionItem value={`entity-${entity.id}`}>
              <AccordionTrigger className="py-2 text-sm">
                {entity.previewName}
              </AccordionTrigger>
              <AccordionContent>
                <button
                  onClick={() => {
                    insertFormElement(textfield);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  تکست
                </button>
                <button
                  onClick={() => {
                    insertFormElement(number);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  عدد
                </button>
                <button
                  onClick={() => {
                    insertFormElement(checkbox);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  چک باکس
                </button>
                <button
                  onClick={() => {
                    insertFormElement(date);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  تاریخ
                </button>
                <button
                  onClick={() => {
                    insertFormElement(email);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  ایمیل
                </button>
                <button
                  onClick={() => {
                    insertFormElement(file);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  فایل
                </button>
                <button
                  onClick={() => {
                    insertFormElement(password);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  پسوورد
                </button>
                <button
                  onClick={() => {
                    insertFormElement(radio);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  radio
                </button>
                <button
                  onClick={() => {
                    insertFormElement(range);
                  }}
                  className="block w-full rounded-md py-2 ps-2 text-start transition-colors hover:bg-primary/30"
                >
                  رنج
                </button>
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
