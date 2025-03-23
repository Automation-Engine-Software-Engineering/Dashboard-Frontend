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

  const wrapper = `<div id="input-wrapper" class="wrapper" data-type="${type}" contenteditable="false" style="display: inline-block; max-width:100%;resize: both; height:50px; width:50px" oninput="event.preventDefault();">`;

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
