import { ContextMenuSeparator } from "@/components/ui/context-menu";

import ColorPicker from "./color-picker";
import ConvertToLink from "./convert-to-link";
import SizePicker from "./size-picker";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const SvgContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <ColorPicker rightClickedElement={rightClickedElement} />
      <SizePicker rightClickedElement={rightClickedElement} />
      <ContextMenuSeparator />
      <ConvertToLink rightClickedElement={rightClickedElement} />
    </>
  );
};
export default SvgContextActions;
