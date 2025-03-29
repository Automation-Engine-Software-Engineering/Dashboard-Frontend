import {
  BarChart3Icon,
  ChartNoAxesColumn,
  ChartPieIcon,
  ChevronDown,
  LineChartIcon
} from "lucide-react";
import React from "react";

import { createRoot } from "react-dom/client";

import { restoreSelection, saveSelection } from "@/utils/selection";

import BarChart from "@/components/common/charts/bar";
import LineChart from "@/components/common/charts/line";
import PieChart from "@/components/common/charts/pie";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import ToolbarButton from "./toolbar-button";

enum Charts {
  line = "line",
  bar = "bar",
  pie = "pie",
  button = "button"
}

const InsertChart: React.FC<
  React.ComponentProps<"button"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  const handleInsertChart = (chart: keyof typeof Charts) => {
    if (editorRef.current) {
      const chartContainer = document.createElement("div");
      chartContainer.contentEditable = "false";
      chartContainer.style.margin = "10px 0";
      chartContainer.dir = "ltr";

      const spacer = document.createElement("div");
      spacer.contentEditable = "true";
      spacer.innerHTML = "<br>";

      restoreSelection();
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);

        if (editorRef.current?.contains(range.commonAncestorContainer)) {
          range.deleteContents();
          range.insertNode(chartContainer);
          range.setStartAfter(chartContainer);
          range.setEndAfter(chartContainer);
        } else {
          const spacer = document.createElement("br");
          editorRef.current?.appendChild(chartContainer);
          editorRef.current?.appendChild(spacer);
        }

        editorRef.current?.focus();
      }

      const chartRoot = createRoot(chartContainer);

      switch (chart) {
        case "bar":
          chartRoot.render(<BarChart />);
          break;
        case "line":
          chartRoot.render(<LineChart />);
          break;
        case "pie":
          chartRoot.render(<PieChart />);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToolbarButton
          className="flex size-fit items-center gap-x-1"
          onClick={() => {
            saveSelection();
          }}
        >
          <ChartNoAxesColumn />
          Chart
          <ChevronDown />
        </ToolbarButton>
      </PopoverTrigger>
      <PopoverContent className="w-64 overflow-hidden p-0 py-2" dir="ltr">
        <Button
          className="w-full justify-start rounded-none"
          variant="ghost"
          onClick={() => {
            handleInsertChart("bar");
          }}
        >
          <BarChart3Icon size={20} className="text-primary" />
          <span className="font-semibold">Bar</span>
        </Button>
        <Button
          className="w-full justify-start rounded-none"
          variant="ghost"
          onClick={() => {
            handleInsertChart("line");
          }}
        >
          <LineChartIcon size={20} className="text-primary" />
          <span className="font-semibold">Line</span>
        </Button>
        <Button
          className="w-full justify-start rounded-none"
          variant="ghost"
          onClick={() => {
            handleInsertChart("pie");
          }}
        >
          <ChartPieIcon size={20} className="text-primary" />
          <span className="font-semibold">Pie</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default InsertChart;
