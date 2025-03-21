export const checkState = (
  command: string,
  editorRef: React.RefObject<HTMLDivElement>
) => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0 && editorRef.current) {
    const selectedNode = selection.getRangeAt(0).commonAncestorContainer;

    if (editorRef.current.contains(selectedNode)) {
      return document.queryCommandState(command);
    }
  }

  return false;
};
