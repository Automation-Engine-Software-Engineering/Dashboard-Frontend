import {
  BarChart2Icon,
  ChartNoAxesColumn,
  ChevronDown,
  LineChartIcon,
  PieChartIcon,
  PlusCircleIcon
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { createRoot } from "react-dom/client";

import { restoreSelection, saveSelection } from "@/utils/selection";

import BarChart from "@/components/common/charts/bar";
import LineChart from "@/components/common/charts/line";
import PieChart from "@/components/common/charts/pie";
import ReceiveDatabaseModal from "@/components/common/modals/receive-database-modal";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ToolbarButton from "./toolbar-button";

interface RepeaterInputsProps {
  defaultValues?: { value: number; label: string }[];
  onValuesChange?: (values: { value: number; label: string }[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] =
    useState<keyof typeof Charts>("bar");

  const chartContainer = document.createElement("div");

  const handleInsertChart = (values: RepeaterInputsProps["defaultValues"]) => {
    if (editorRef.current) {
      chartContainer.contentEditable = "false";
      chartContainer.style.display = "inline-block";
      chartContainer.style.maxWidth = "100%";
      chartContainer.style.resize = "both";
      chartContainer.style.overflow = "hidden";
      chartContainer.style.minWidth = "100px";
      chartContainer.style.minHeight = "100px";
      chartContainer.style.border = "1px solid #0099A5";

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

      switch (selectedChart) {
        case "bar":
          chartRoot.render(<BarChart values={values!} />);
          break;
        case "line":
          chartRoot.render(<LineChart values={values!} />);
          break;
        case "pie":
          chartRoot.render(<PieChart values={values!} />);
          break;
        default:
          break;
      }
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
        <ToolbarButton
          className="flex size-fit items-center gap-x-1"
          onClick={() => {
            saveSelection();
            setIsModalOpen(true);
          }}
        >
          <ChartNoAxesColumn />
          Chart
          <ChevronDown />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="">
        <Tabs defaultValue="manual" dir="rtl">
          <TabsList className="mb-5 w-full rounded-md bg-slate-100 p-2">
            <TabsTrigger
              value="manual"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              انتخاب اطلاعات دستی
            </TabsTrigger>
            <TabsTrigger
              value="database"
              className="flex-1 rounded-md data-[state=active]:bg-primary/30"
            >
              انتخاب اطلاعات از دیتابیس
            </TabsTrigger>
          </TabsList>
          <label htmlFor="" className="block text-sm text-slate-800">
            نوع نمودار
          </label>
          <Select
            dir="rtl"
            defaultValue="bar"
            onValueChange={(val: keyof typeof Charts) => setSelectedChart(val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">
                <BarChart2Icon className="text-primary" />
              </SelectItem>
              <SelectItem value="line">
                <LineChartIcon className="text-primary" />
              </SelectItem>
              <SelectItem value="pie">
                <PieChartIcon className="text-primary" />
              </SelectItem>
            </SelectContent>
          </Select>
          <TabsContent value="manual" className="mt-5">
            <ModalManualTab onConfirm={handleInsertChart} />
          </TabsContent>
          <TabsContent value="database" className="mt-5">
            <ReceiveDatabaseModal
              onClose={() => {
                setIsModalOpen(false);
              }}
              onConfirm={() =>
                handleInsertChart([{ label: "test", value: 100 }])
              }
              element={chartContainer}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

const ModalManualTab = ({
  onConfirm
}: {
  onConfirm: (data: { value: number; label: string }[]) => void;
}) => {
  const [values, setValues] = useState<RepeaterInputsProps["defaultValues"]>(
    []
  );

  return (
    <>
      <div className="max-h-64 overflow-auto p-2">
        <TextfieldRepeater
          defaultValues={[{ label: "", value: 0 }]}
          onValuesChange={setValues}
        />
      </div>

      <Button
        className="mt-5 w-full"
        onClick={() => {
          onConfirm(values!);
        }}
      >
        تبدیل
      </Button>
    </>
  );
};

const TextfieldRepeater: React.FC<RepeaterInputsProps> = ({
  defaultValues = [{ value: 0, label: "" }],
  onValuesChange
}) => {
  const [inputs, setInputs] =
    useState<{ value: number; label: string }[]>(defaultValues);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(inputs);
    }
  }, [inputs]);

  const handleAddInput = () => {
    setInputs((prev) => [...prev, { value: 0, label: "" }]);
  };

  const handleRemoveInput = (index: number) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (index: number, key: string, value: string) => {
    setInputs((prev) =>
      prev.map((v, i) =>
        i === index
          ? { ...v, [key]: key === "value" ? Number(value) : value }
          : v
      )
    );
  };

  return (
    <div className="grid grid-cols-1 items-center gap-3">
      {inputs.map((input, index) => (
        <div key={index} className="flex items-center gap-x-2">
          <Input
            type="number"
            value={input.value}
            onChange={(e) => handleInputChange(index, "value", e.target.value)}
            placeholder="مقدار"
          />
          <Input
            type="text"
            value={input.label}
            onChange={(e) => handleInputChange(index, "label", e.target.value)}
            placeholder="برچسب"
          />
          <Button
            variant="destructive"
            onClick={() => handleRemoveInput(index)}
          >
            حذف
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={handleAddInput}>
        <PlusCircleIcon className="text-slate-400" />
      </Button>
    </div>
  );
};

export default InsertChart;
