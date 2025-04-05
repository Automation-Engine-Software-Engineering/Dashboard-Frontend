import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

const TooltipIcon: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const tooltip = rightClickedElement.parentElement?.querySelector(
    "div.tooltiptext"
  ) as HTMLDivElement;
  const tooltipText = tooltip.innerText ?? "";

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger>تولتیپ</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <Input
            placeholder="placeholder..."
            defaultValue={tooltipText}
            onChange={(e) => {
              tooltip.innerText = e.target.value;
            }}
          />
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
};
export default TooltipIcon;
