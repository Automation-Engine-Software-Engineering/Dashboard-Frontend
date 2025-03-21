type InputType =
  | "text"
  | "number"
  | "checkbox"
  | "date"
  | "email"
  | "file"
  | "password"
  | "radio"
  | "range";

interface InputProps {
  inputId: number;
  type: InputType;
  defaultValue?: string;
}

export const createInput = ({
  inputId,
  type,
  defaultValue = ""
}: InputProps): string => {
  const commonStyles = "width: 100%; height: 100%; box-sizing: border-box;";

  const wrapper = `<div contenteditable="false" style="display: inline-block; resize: both; overflow: hidden;" oninput="event.preventDefault();">`;

  const input = `<input 
    id="${inputId}"
    type="${type}"
    value="${defaultValue}"
    disabled
    style="${commonStyles}" 
  />`;

  if (type === "file" || type === "checkbox" || type === "radio") {
    return `<input id="${inputId}" type="${type}" disabled />`;
  }

  return wrapper + input + "</div>";
};
