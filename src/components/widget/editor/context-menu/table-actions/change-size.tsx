import { ContextMenuItem } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

const ChangeSize: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const size = rightClickedElement.getAttribute("data-size") ?? "0";

  return (
    <ContextMenuItem onClick={(e) => e.preventDefault()}>
      <label
        className="block w-full px-2 py-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        تعداد آیتم در صفحه
      </label>
      <Input
        type="number"
        className="w-16"
        min={1}
        max={100}
        defaultValue={size ?? "0"}
        onChange={(e) => {
          rightClickedElement.setAttribute("data-size", e.target.value);
        }}
      />
    </ContextMenuItem>
  );
};

export default ChangeSize;
