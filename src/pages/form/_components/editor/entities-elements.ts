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
  | "select"
  | "textArea"
  | "editor";

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
  const wrapperStyles =
    "display: inline-block; max-width:100%; resize: both; height:50px; width:50px;";
  const labelStyles = `
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    height: 15px;
    z-index: 100;
    color: red;
    font-size: 18px;
    font-weight: 900;
    background: #eee;
    padding: 0 2px;
    border-radius: 0 0 5px 0;
  `;

  const wrapper = `<div 
    id="input-wrapper" 
    class="wrapper" 
    data-type="${type}" 
    contenteditable="false" 
    style="${wrapperStyles}" 
    oninput="event.preventDefault();"
  >`;

  const label = `<label for="${inputId}" style="${labelStyles}">*</label>`;

  const getInputElement = (): string => {
    switch (type) {
      case "editor":
        return `<div 
          id="${inputId}"
          data-editor="true"
          style="
            border: 1px solid #ccc;
            ${commonStyles}
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          editor
        </div>`;
      case "textArea":
        return `<textarea 
          id="${inputId}"
          disabled
          style="${commonStyles} resize: none;"
        >${defaultValue}</textarea>`;
      case "select":
        return `<select 
          id="${inputId}"
          value="${defaultValue}"
          disabled
          style="${commonStyles}"
        >
          <option value="${defaultValue}">${defaultValue}</option>
        </select>`;
      default:
        return `<input 
          id="${inputId}"
          type="${type}"
          value="${defaultValue}"
          disabled
          style="${commonStyles}" 
        />`;
    }
  };

  return wrapper + getInputElement() + label + "</div>";
};
