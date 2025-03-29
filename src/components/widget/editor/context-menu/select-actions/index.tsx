import Relations from "./relations";
import RequiredInput from "./required";

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
