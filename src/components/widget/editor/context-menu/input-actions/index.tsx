import ConvertToSelect from "./conver-to-select";
import RequiredInput from "./required";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const InputContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <ConvertToSelect rightClickedElement={rightClickedElement} />
      <RequiredInput rightClickedElement={rightClickedElement} />
    </>
  );
};
export default InputContextActions;
