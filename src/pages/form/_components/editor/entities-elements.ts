interface InputProps {
  inputId: number;
  input: { input: string; type: string };
  defaultValue?: string;
}

export const createInput = ({
  inputId,
  input,
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
    data-type="${input.type}" 
    contenteditable="false" 
    style="${wrapperStyles}" 
    oninput="event.preventDefault();"
  >`;

  const label = `<label for="${inputId}" style="${labelStyles}">*</label>`;

  const getInputElement = (): string => {
    switch (input.type) {
      case "editor":
        return `<div 
          id="${inputId}"
          data-input-type="editor"
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
      case "long-text":
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

      case "date":
        return `<input 
            id="${inputId}"
            type="text"
            value="${defaultValue}"
            data-jdp
            data-jdp-only-date
            disabled
            style="${commonStyles}" 
          />`;

      case "price":
        return `<input 
            id="${inputId}"
            type="text"
            value="${defaultValue}"
            data-input-type="price"
            disabled
            style="${commonStyles}" 
          /> <span id="price-text" style="font-size:12px;">0 تومان</span>`;

      case "image-preview":
        return `<input 
            id="${inputId}"
            type="file"
            value="${defaultValue}"
            data-input-type="image-preview"
            disabled
            style="${commonStyles}" 
          /><img id="image-preview" alt="Image Preview" />`;

      default:
        return `<input 
          id="${inputId}"
          type="${input.input}"
          value="${defaultValue}"
          disabled
          style="${commonStyles}" 
        />`;
    }
  };

  return wrapper + getInputElement() + label + "</div>";
};
