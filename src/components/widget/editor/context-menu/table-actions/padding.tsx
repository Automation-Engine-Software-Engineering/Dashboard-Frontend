import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

const TablePadding: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const container = rightClickedElement.parentElement as HTMLDivElement;

  const computedStyle = getComputedStyle(container);
  const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
  const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
  const paddingLeft = parseInt(computedStyle.paddingLeft, 10) || 0;
  const paddingRight = parseInt(computedStyle.paddingRight, 10) || 0;

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>سایز</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <Input
          type="range"
          className="h-5 border-none p-0"
          min={1}
          max={500}
          step={1}
          defaultValue={paddingTop}
          onChange={(e) => {
            container.style.paddingTop = `${e.target.value}px`;
          }}
        />
        <Input
          type="range"
          className="h-5 border-none p-0"
          min={1}
          max={500}
          step={1}
          defaultValue={paddingBottom}
          onChange={(e) => {
            container.style.paddingBottom = `${e.target.value}px`;
          }}
        />
        <Input
          type="range"
          className="h-5 border-none p-0"
          min={1}
          max={500}
          step={1}
          defaultValue={paddingLeft}
          onChange={(e) => {
            container.style.paddingLeft = `${e.target.value}px`;
          }}
        />
        <Input
          type="range"
          className="h-5 border-none p-0"
          min={1}
          max={500}
          step={1}
          defaultValue={paddingRight}
          onChange={(e) => {
            container.style.paddingRight = `${e.target.value}px`;
          }}
        />
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};

export default TablePadding;
