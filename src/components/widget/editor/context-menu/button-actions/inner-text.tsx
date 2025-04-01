import { ContextMenuItem } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";

const RequiredInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const innerText = rightClickedElement.innerText;

  return (
    <>
      <ContextMenuItem onClick={(e) => e.preventDefault()}>
        <Input
          defaultValue={innerText}
          placeholder="متن دکمه"
          onChange={(e) => {
            rightClickedElement.innerText = e.target.value;
          }}
        />
      </ContextMenuItem>
    </>
  );
};
export default RequiredInput;
