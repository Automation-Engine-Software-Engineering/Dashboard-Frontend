import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

interface HighlightInputProps {
  onChange?: (value: string) => void;
  value?: string;
}

const HighlightInput = forwardRef<HTMLDivElement, HighlightInputProps>(
  ({ onChange, value = "" }, ref) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    const handleInput = () => {
      if (!innerRef.current) return;

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      let caretOffset = 0;
      if (selection && range) {
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(innerRef.current);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }

      const content = innerRef.current.innerText;

      if (onChange) {
        onChange(content);
      }

      const highlightedContent = content.replace(
        /{{\s*[\w\s]+\s*}}/g,
        (match) =>
          `<span class="highlight-text" contentEditable="false">${match}</span>`
      );

      if (innerRef.current.innerHTML !== highlightedContent) {
        innerRef.current.innerHTML = highlightedContent;

        const range = document.createRange();
        const nodes = Array.from(innerRef.current.childNodes);
        let charCount = 0;

        for (const node of nodes) {
          const nodeLength = node.textContent?.length || 0;
          if (charCount + nodeLength >= caretOffset) {
            const offset = caretOffset - charCount;
            if (node.nodeType === 3) {
              range.setStart(node, Math.min(offset, nodeLength));
              range.setEnd(node, Math.min(offset, nodeLength));
            } else if (node.nodeType === 1) {
              const child = node.firstChild;
              if (child && child.nodeType === 3) {
                range.setStart(
                  child,
                  Math.min(offset, child.textContent?.length || 0)
                );
                range.setEnd(
                  child,
                  Math.min(offset, child.textContent?.length || 0)
                );
              }
            }
            range.collapse(true);
            break;
          }
          charCount += nodeLength;
        }

        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    };

    useEffect(() => {
      if (innerRef.current && innerRef.current.innerHTML !== value) {
        innerRef.current.innerHTML = value;
      }
    }, [value]);

    return (
      <div>
        <div
          ref={innerRef}
          contentEditable
          onInput={handleInput}
          className="rounded border p-2 focus:outline-none"
          style={{
            minHeight: "40px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
          dir="ltr"
        ></div>
        <style>
          {`
            .highlight-text {
              color: #0099A5; /* Tailwind's blue-600 */
              font-weight: 500; /* Tailwind's font-medium */
              background-color: #0099A520; /* Tailwind's blue-100 */
              border-radius: 4px;
              padding: 0 4px;
            }
          `}
        </style>
      </div>
    );
  }
);

export default HighlightInput;
