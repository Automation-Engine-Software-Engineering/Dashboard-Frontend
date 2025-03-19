import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";

import { useSearchParams } from "react-router-dom";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-slate-200/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors odd:bg-white even:bg-[#F8FAFD] hover:bg-slate-200/50 data-[state=selected]:bg-slate-200",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 bg-[#E4EBF3] px-4 text-start align-middle font-medium text-slate-700 [&:has([role=checkbox])]:pe-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "border border-[#E4EBF3] p-4 align-middle [&:has([role=checkbox])]:pe-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-slate-400", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

const TablePagination = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { totalItems: number }
>(({ totalItems }, ref) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageSize, setPageSize] = React.useState<number>(
    Number(searchParams.get("size")) || 10
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / pageSize);

  const updatePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page.toString());
      return params;
    });
  };

  const updatePageSize = (size: number) => {
    setPageSize(size);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", "1");
      params.set("size", size.toString());
      return params;
    });
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => updatePage(i)}
          className={`px-3 py-2 transition-colors hover:bg-primary/20 ${
            i === currentPage ? "font-bold text-primary" : "text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 transition-colors ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700 hover:bg-primary/20"
          }`}
        >
          <ChevronLeft size={16} className="text-primary" />
        </button>
        {pages}
        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 transition-colors ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700 hover:bg-primary/20"
          }`}
        >
          <ChevronRight size={16} className="text-primary" />
        </button>
      </>
    );
  };

  return (
    <div
      ref={ref}
      className="flex h-16 items-center border border-slate-300 bg-white px-10"
      dir="ltr"
    >
      <select
        className="me-5 rounded border border-gray-300 px-3 py-1"
        value={pageSize}
        defaultValue={10}
        onChange={(e) => updatePageSize(Number(e.target.value))}
      >
        {[10, 20, 50, 100].map((size) => (
          <option key={size} value={size}>
            نمایش {size} نتیجه
          </option>
        ))}
      </select>
      <div className="flex divide-x divide-slate-300 border border-slate-300">
        {renderPageNumbers()}
      </div>
    </div>
  );
});

TablePagination.displayName = "TablePagination";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TablePagination
};
