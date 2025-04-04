import CurrentDate from "../shared/current-date";
import DisableInput from "../shared/disable";
import GroupByInput from "../shared/group-by";
import HiddenInput from "../shared/hidden";
import ReadOnlyInput from "../shared/read-only";
import Relation from "../shared/relations";
import RequiredInput from "../shared/required";
import AcceptedFiles from "./accepted-file";
import ConvertToSelect from "./convert-to-select";
import PlaceholderInput from "./placeholder";
import InputValidation from "./validation";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const InputContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  const isDate = rightClickedElement.hasAttribute("data-jdp");
  return (
    <>
      <ConvertToSelect rightClickedElement={rightClickedElement} />
      <RequiredInput rightClickedElement={rightClickedElement} />
      <PlaceholderInput rightClickedElement={rightClickedElement} />
      <GroupByInput rightClickedElement={rightClickedElement} />
      <DisableInput rightClickedElement={rightClickedElement} />
      <ReadOnlyInput rightClickedElement={rightClickedElement} />
      <HiddenInput rightClickedElement={rightClickedElement} />
      <Relation rightClickedElement={rightClickedElement} />
      <InputValidation rightClickedElement={rightClickedElement} />
      <AcceptedFiles rightClickedElement={rightClickedElement} />
      {isDate && <CurrentDate rightClickedElement={rightClickedElement} />}
    </>
  );
};
export default InputContextActions;
