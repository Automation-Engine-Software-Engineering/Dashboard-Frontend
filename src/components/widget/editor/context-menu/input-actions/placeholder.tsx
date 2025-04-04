import {
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

const PlaceholderInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const placeholder = rightClickedElement.getAttribute("placeholder");

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Placeholder</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <Input
            placeholder="placeholder..."
            defaultValue={placeholder ?? ""}
            onChange={(e) => {
              rightClickedElement.setAttribute("placeholder", e.target.value);
            }}
          />
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
};
export default PlaceholderInput;
