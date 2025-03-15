export const checkState = (command: string) => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return document.queryCommandState(command);
  }
};
