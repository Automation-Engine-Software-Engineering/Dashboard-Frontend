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

  const label = `<label for="${inputId}" style="position: absolute;top:0;left:0;display: block;height: 15px;z-index:100;display:none;color: red;font-size: 18px;font-weight: 900;background: #eee;padding: 0 2px;border-radius: 0px 0px 5px 0px;">*</label>`;

  if (type === "file" || type === "checkbox" || type === "radio") {
    return `<input id="${inputId}" type="${type}" disabled />`;
  }

  return wrapper + input + label + "</div>";
};
