import BackgroundColorPicker from "./background-color-picker";
import Relations from "./inner-text";
import TextColorPicker from "./text-color-picker";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const ButtonContextActions: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <Relations rightClickedElement={rightClickedElement} />
      <BackgroundColorPicker rightClickedElement={rightClickedElement} />
      <TextColorPicker rightClickedElement={rightClickedElement} />
    </>
  );
};
export default ButtonContextActions;
