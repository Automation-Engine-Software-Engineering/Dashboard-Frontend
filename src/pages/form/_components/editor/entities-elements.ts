type InputType =
  | "text"
  | "number"
  | "checkbox"
  | "date"
  | "email"
  | "file"
  | "password"
  | "radio"
  | "range"
  | "select";

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

  let element;

  if (type === "select") {
    element = `<select 
  id="${inputId}"
  value="${defaultValue}"
  disabled
  style="${commonStyles}" 
><option value="${defaultValue}">${defaultValue}</option></select>`;
  } else {
    element = `<input 
  id="${inputId}"
  type="${type}"
  value="${defaultValue}"
  disabled
  style="${commonStyles}" 
/>`;
  }
  const label = `<label for="${inputId}" style="position: absolute;top:0;left:0;display: block;height: 15px;z-index:100;display:none;color: red;font-size: 18px;font-weight: 900;background: #eee;padding: 0 2px;border-radius: 0px 0px 5px 0px;">*</label>`;

  return wrapper + element + label + "</div>";
};
