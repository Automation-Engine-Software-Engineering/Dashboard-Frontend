import CurrentDate from "../shared/current-date";
import DisableInput from "../shared/disable";
import GroupByInput from "../shared/group-by";
import HiddenInput from "../shared/hidden";
import ReadOnlyInput from "../shared/read-only";
import Relation from "../shared/relations";
import RequiredInput from "../shared/required";
import ConvertToSelect from "./convert-to-select";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const InputContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  const inputType = rightClickedElement.getAttribute("type");

  return (
    <>
      <ConvertToSelect rightClickedElement={rightClickedElement} />
      <RequiredInput rightClickedElement={rightClickedElement} />
      <GroupByInput rightClickedElement={rightClickedElement} />
      <DisableInput rightClickedElement={rightClickedElement} />
      <ReadOnlyInput rightClickedElement={rightClickedElement} />
      <HiddenInput rightClickedElement={rightClickedElement} />
      <Relation rightClickedElement={rightClickedElement} />
      {inputType === "date" && (
        <CurrentDate rightClickedElement={rightClickedElement} />
      )}
    </>
  );
};
export default InputContextActions;
