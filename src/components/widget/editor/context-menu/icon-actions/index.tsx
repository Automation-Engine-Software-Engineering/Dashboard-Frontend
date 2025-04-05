import { ContextMenuSeparator } from "@/components/ui/context-menu";

import ColorPicker from "./color-picker";
import ConvertToLink from "./convert-to-link";
import SizePicker from "./size-picker";
import TooltipIcon from "./tooltip";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const IconContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <ColorPicker rightClickedElement={rightClickedElement} />
      <SizePicker rightClickedElement={rightClickedElement} />
      <TooltipIcon rightClickedElement={rightClickedElement} />
      <ContextMenuSeparator />
      <ConvertToLink rightClickedElement={rightClickedElement} />
    </>
  );
};
export default IconContextActions;
