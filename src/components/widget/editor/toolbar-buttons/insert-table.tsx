import HighlightInput from "highlightable-input/react";
import { ChevronDownIcon, TableIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { getEntityProperties } from "@/api/property";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { PropertyType } from "@/types/form/property";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";

import { restoreSelection, saveSelection } from "@/utils/selection";

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

  const createTableWithResizer = () => {
    if (!editorRef.current) return;

    const wrapper = document.createElement("div");
    wrapper.contentEditable = "false";
    wrapper.id = "table-container";

    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.contentEditable = "false";
    table.setAttribute("data-size", "10");

    const tbody = document.createElement("tbody");
    const thead = document.createElement("thead");
    const headRow = document.createElement("tr");

    for (let i = 0; i < cols; i++) {
      const cell = document.createElement("td");
      cell.style.padding = "8px";
      cell.style.minHeight = "40px";
      cell.style.position = "relative";
      cell.style.fontWeight = "bold";
      cell.contentEditable = "true";

      headRow.appendChild(cell);
    }

    thead.appendChild(headRow);

    for (let i = 0; i < rows; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < cols; j++) {
        const cell = document.createElement("td");
        cell.style.padding = "8px";
        cell.style.minHeight = "20px";
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
          resizer.contentEditable = "false";

          resizer.addEventListener("mousedown", (e) => handleResize(e, cell));

          cell.appendChild(resizer);
        }

        row.appendChild(cell);
      }

      tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    wrapper.appendChild(table);

    restoreSelection();
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        range.deleteContents();
        range.insertNode(wrapper);

        const spacer = document.createElement("br");

        range.setStartAfter(wrapper);
        range.setEndAfter(wrapper);
        range.insertNode(spacer);

        range.setStartAfter(spacer);
        range.setEndAfter(spacer);
      } else {
        const spacer = document.createElement("br");
        editorRef.current?.appendChild(wrapper);
        editorRef.current?.appendChild(spacer);
      }

      editorRef.current?.focus();
    }
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
          onClick={() => {
            saveSelection();
          }}
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
          <Button className="col-span-full" onClick={createTableWithResizer}>
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
      <DialogContent className="max-h-[90vh] overflow-auto">
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
  const [relation, setRelation] = useState("");

  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  const handleCreateTable = () => {
    if (selectedEntityId) {
      const wrapper = document.createElement("div");
      wrapper.contentEditable = "false";
      wrapper.id = "table-container";

      const table = document.createElement("table");
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
      table.style.height = "100%";
      table.style.maxWidth = "100%";

      table.setAttribute("data-tableId", selectedEntityId ?? "");
      table.setAttribute("data-filter", filter);
      table.setAttribute("data-condition", condition);
      table.setAttribute("data-relation", relation);
      table.setAttribute("data-size", "10");

      table.innerHTML = `
        <thead>
          <tr>
            <td>
              عنوان جدول
            </td>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>
              متن نمایشی
            </td>
          </tr>
        </tbody>
      `;

      wrapper.appendChild(table);

      if (!selectedEntityId) {
        toast.error("لطفا یک دیتابیس رو انتخاب کنید");
        return;
      }

      toast.success("با موفقیت تبدیل شد");

      restoreSelection();
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);

        if (editorRef.current?.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(wrapper);

          const spacer = document.createElement("br");

          range.setStartAfter(wrapper);
          range.setEndAfter(wrapper);
          range.insertNode(spacer);

          range.setStartAfter(spacer);
          range.setEndAfter(spacer);
        } else {
          const spacer = document.createElement("br");
          editorRef.current?.appendChild(wrapper);
          editorRef.current?.appendChild(spacer);
        }

        editorRef.current?.focus();
      }
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
        <HighlightInput
          dir="ltr"
          value={filter}
          onChange={setFilter}
          className="h-12 w-full border border-slate-300 bg-white"
          style={{
            display: "block",
            width: "100%",
            minHeight: 40,
            padding: "5px 7px",
            border: "1px solid rgb(204,204,204)",
            borderRadius: 6
          }}
          highlight={[
            {
              pattern: /{{\s*([^}]*)\s*}}/g,
              style: "background-color:#0099A520; color:#0099A5"
            },
            {
              pattern: /\[\[\s*([^\]]+)\s*\]\]/g,
              style: "background-color:#0099A540; color:#0099A5"
            }
          ]}
        />
      </div>
      <div>
        <label htmlFor="" className="mb-1 block text-sm text-slate-800">
          نمایش مقدار
        </label>
        <HighlightInput
          dir="ltr"
          value={condition}
          onChange={setCondition}
          className="h-12 w-full border border-slate-300 bg-white"
          style={{
            display: "block",
            width: "100%",
            minHeight: 40,
            padding: "5px 7px",
            border: "1px solid rgb(204,204,204)",
            borderRadius: 6
          }}
          highlight={[
            {
              pattern: /{{\s*([^}]*)\s*}}/g,
              style: "background-color:#0099A520; color:#0099A5"
            },
            {
              pattern: /\[\[\s*([^\]]+)\s*\]\]/g,
              style: "background-color:#0099A540; color:#0099A5"
            }
          ]}
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {properties?.map((property) => (
            <Button
              key={property.id}
              size="sm"
              variant="secondary"
              className="h-fit px-3 py-2 text-xs"
              onClick={() => {
                setCondition((prev) => `${prev} {{${property.propertyName}}}`);
              }}
            >
              {property.previewName}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="" className="mb-1 block text-sm text-slate-800">
          نمایش ارتباطات
        </label>
        <HighlightInput
          dir="ltr"
          value={relation}
          onChange={setRelation}
          className="h-12 w-full border border-slate-300 bg-white"
          style={{
            display: "block",
            width: "100%",
            minHeight: 40,
            padding: "5px 7px",
            border: "1px solid rgb(204,204,204)",
            borderRadius: 6
          }}
          highlight={[
            {
              pattern: /{{\s*([^}]*)\s*}}/g,
              style: "background-color:#0099A520; color:#0099A5"
            },
            {
              pattern: /\[\[\s*([^\]]+)\s*\]\]/g,
              style: "background-color:#0099A540; color:#0099A5"
            }
          ]}
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="h-fit px-3 py-2 text-xs"
            onClick={() => {
              setRelation((prev) => `${prev} JOIN`);
            }}
          >
            JOIN
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-fit px-3 py-2 text-xs"
            onClick={() => {
              setRelation((prev) => `${prev} ON`);
            }}
          >
            ON
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-fit px-3 py-2 text-xs"
            onClick={() => {
              setRelation((prev) => `${prev} =`);
            }}
          >
            =
          </Button>
          {entities?.data?.map((entity) => (
            <Button
              key={entity.id}
              size="sm"
              variant="secondary"
              className="h-fit px-3 py-2 text-xs"
              onClick={() => {
                setRelation((prev) => `${prev} {{${entity.previewName}}}`);
              }}
            >
              {entity.previewName}
            </Button>
          ))}
        </div>
      </div>
      <Button className="w-full" onClick={handleCreateTable}>
        تبدیل
      </Button>
    </div>
  );
};

export default InsertTable;
