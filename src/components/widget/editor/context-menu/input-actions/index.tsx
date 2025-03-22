import ConvertToSelect from "./conver-to-select";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const InputContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <ConvertToSelect rightClickedElement={rightClickedElement} />
    </>
  );
};
export default InputContextActions;
