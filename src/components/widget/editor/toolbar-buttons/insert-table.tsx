import { ChevronDownIcon, TableIcon } from "lucide-react";
import { useState } from "react";

import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { cn } from "@/lib/utils";

import { restoreSelection, saveSelection } from "@/utils/selection";

import ReceiveDatabaseModal from "@/components/common/modals/receive-database-modal";

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

    const tableRepeater = `
    <div
        id="table-repeater-wrapper"
        style="
          width:100%;
          display: flex;
          align-items: center;
          justify-content: end;
          margin-top: 10px;
        "
      >
        <button id="table-repeater-button">+</button>
      </div>
    `;

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

    wrapper.insertAdjacentHTML("beforeend", tableRepeater);

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

  const table = document.createElement("table");

  const handleCreateTable = () => {
    const tableId = uuidv4();

    const wrapper = document.createElement("div");
    wrapper.contentEditable = "false";
    wrapper.id = "table-container";

    const searchItems = `<div
        id="table-search-wrapper"
        style="
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        "
      >
        <input id="table-search-input" type="text" placeholder="جستجو..." />
        <select id="table-filter" data-search-id="${tableId}">
          <option value="test">تست</option>
        </select>
        <button id="table-search-button">جستجو</button>
      </div>`;

    const paginationItems = ` <div
        id="table-pagination-wrapper"
        style="
          width:100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        "
      >
        <button id="table-next">بعدی</button>
        <button id="table-previous">قبلی</button>
      </div>`;

    const tableRepeater = `
    <div
        id="table-repeater-wrapper"
        style="
          width:100%;
          display: flex;
          align-items: center;
          justify-content: end;
          margin-top: 10px;
        "
      >
        <button id="table-repeater-button">+</button>
      </div>
    `;

    wrapper.insertAdjacentHTML("afterbegin", searchItems);

    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.height = "100%";
    table.style.maxWidth = "100%";
    table.id = tableId;

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
    wrapper.insertAdjacentHTML("beforeend", tableRepeater);
    wrapper.insertAdjacentHTML("beforeend", paginationItems);

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
  };

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
        <ReceiveDatabaseModal
          element={table}
          onConfirm={handleCreateTable}
          onClose={() => setIsModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default InsertTable;
