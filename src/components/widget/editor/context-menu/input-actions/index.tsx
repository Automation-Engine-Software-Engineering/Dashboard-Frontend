import ConvertToSelect from "./conver-to-select";
import CurrentDate from "./current-date";
import DisableInput from "./disable";
import GroupByInput from "./group-by";
import HiddenInput from "./hidden";
import ReadOnlyInput from "./read-only";
import Relation from "./relations";
import RequiredInput from "./required";

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
