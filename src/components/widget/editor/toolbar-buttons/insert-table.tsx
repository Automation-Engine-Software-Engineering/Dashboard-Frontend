import { ChevronDownIcon, TableIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getEntityProperties } from "@/api/property";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { PropertyType } from "@/types/form/property";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";

import HighlightInput from "@/components/common/highligh-input";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

const InsertTable: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef, className }) => {
  const [rows, setRows] = useState<number>(3);
  const [cols, setCols] = useState<number>(3);

  const createTableWithResizers = () => {
    if (!editorRef.current) return;

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.border = "1px solid black";
    table.contentEditable = "false"


    for (let i = 0; i < rows; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        cell.style.padding = "8px";
        cell.style.minHeight = "20px"
        cell.style.border = "1px solid black";
        cell.style.position = "relative";
        cell.contentEditable = "true";


        if (i === 0 && j > 0) {
          const resizer = document.createElement("div");
          resizer.style.width = "4px";
          resizer.style.height = "100%";
          resizer.style.position = "absolute";
          resizer.style.top = "0";
          resizer.style.right = "0";
          resizer.style.cursor = "col-resize";
          resizer.style.backgroundColor = "transparent";
          resizer.contentEditable = "false"

          resizer.addEventListener("mousedown", (e) => handleResize(e, cell));

          cell.appendChild(resizer);
        }

        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    const spacer = document.createElement("br");

    editorRef.current.appendChild(table);
    editorRef.current.appendChild(spacer);
  };

  const handleResize = (event: MouseEvent, cell: HTMLTableCellElement) => {
    const startX = event.pageX;
    const startWidth = cell.offsetWidth;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.pageX - startX);
      if (newWidth > 20) {
        cell.style.width = `${newWidth}px`;
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          className={cn(
            "flex size-fit items-center gap-x-2 font-sans",
            className
          )}
        >
          <TableIcon />
          Table
          <ChevronDownIcon />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid w-48 grid-cols-2 gap-3">
          <Input
            type="number"
            placeholder="Row"
            onChange={(e) => setRows(+e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Col"
            onChange={(e) => setCols(+e.target.value)}
            required
          />
          <Button className="col-span-full" onClick={createTableWithResizers}>
            Insert
          </Button>
        </div>
        <hr className="my-2" />
        <TableModal editorRef={editorRef} />
      </PopoverContent>
    </Popover>
  );
};

const TableModal = ({
  editorRef
}: {
  editorRef: React.RefObject<HTMLDivElement>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) {
          setIsModalOpen(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsModalOpen(true)}
        >
          واکشی اطلاعات
        </Button>
      </DialogTrigger>
      <DialogContent>
        <ModalContent
          editorRef={editorRef}
          onClose={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

const ModalContent = ({
  editorRef,
  onClose
}: {
  editorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const { data: entities, isLoading } = useFormEntities();
  const [selectedEntityId, setSelectedEntityId] = useState<null | string>(null);
  const [filter, setFilter] = useState("");
  const [condition, setCondition] = useState("");

  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  const highlightInputRef = useRef<HTMLDivElement>(null);

  const handleCreateTable = () => {
    if (selectedEntityId) {
      const table = document.createElement("table");
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
      table.style.height = "100%";
      table.style.maxWidth = "100%";

      table.setAttribute("data-tableId", selectedEntityId ?? "");
      table.setAttribute("data-filter", filter);
      table.setAttribute("data-condition", condition);

      table.innerHTML = `<tr><td>پیش نمایش</td></tr>`;

      if (!selectedEntityId) {
        toast.error("لطفا یک دیتابیس رو انتخاب کنید");
        return;
      }

      toast.success("با موفقیت تبدیل شد");

      editorRef.current?.appendChild(table);

      onClose();
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedEntityId) {
        const response = await getEntityProperties(selectedEntityId, {
          page: 1,
          size: 100
        });

        setProperties(response?.data ?? null);
      }
    })();
  }, [selectedEntityId]);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <HashLoader color="#0099A5" />
      </div>
    );

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          جدول
        </label>
        <select
          onChange={(e) => {
            setSelectedEntityId(e.target.value);
          }}
          className="mt-2 w-full rounded-md border border-slate-300 p-2 text-slate-800"
        >
          <option selected disabled>
            انتخاب جدول
          </option>
          {entities?.data.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.previewName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          شرط
        </label>
        <Input
          type="text"
          className="mt-2"
          dir="ltr"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          نمایش مقدار
        </label>
        <HighlightInput onChange={setCondition} ref={highlightInputRef} />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {properties?.map((property) => (
            <Button
              key={property.id}
              size="sm"
              variant="secondary"
              className="h-fit px-3 py-2 text-xs"
              onClick={() => {
                if (highlightInputRef.current) {
                  highlightInputRef.current.innerHTML = `${highlightInputRef.current.innerHTML} {{${property.propertyName}}}`;
                }
              }}
            >
              {property.previewName}
            </Button>
          ))}
        </div>
      </div>
      <Button className="w-full" onClick={handleCreateTable}>
        ساخت
      </Button>
    </div>
  );
};

export default InsertTable;
