import Relations from "../shared/relations";
import RequiredInput from "../shared/required";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const SelectContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <Relations rightClickedElement={rightClickedElement} />
      <RequiredInput rightClickedElement={rightClickedElement} />
    </>
  );
};
export default SelectContextActions;
