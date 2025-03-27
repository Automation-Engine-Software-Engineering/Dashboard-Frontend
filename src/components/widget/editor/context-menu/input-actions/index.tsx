import ConvertToSelect from "./conver-to-select";
import GroupByInput from "./group-by";
import RequiredInput from "./required";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const InputContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <ConvertToSelect rightClickedElement={rightClickedElement} />
      <RequiredInput rightClickedElement={rightClickedElement} />
      <GroupByInput rightClickedElement={rightClickedElement} />
    </>
  );
};
export default InputContextActions;
