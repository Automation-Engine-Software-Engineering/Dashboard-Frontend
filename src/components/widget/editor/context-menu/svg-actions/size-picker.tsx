import { Input } from "@/components/ui/input";

const SizePicker: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const size = rightClickedElement.style.width.replace(/px/, "");
  return (
    <>
      <label
        className="block w-full px-2 py-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        سایز
      </label>
      <Input
        type="range"
        className="h-5 border-none p-0"
        min={1}
        max={100}
        step={1}
        defaultValue={size}
        onChange={(e) => {
          rightClickedElement.style.width = e.target.value;
          rightClickedElement.style.height = e.target.value;
        }}
      />
    </>
  );
};
export default SizePicker;
